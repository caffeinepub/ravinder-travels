import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Initialize the access control system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Management
  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Booking Request Management
  public type BookingRequest = {
    name : Text;
    phone : Text;
    serviceType : Text;
    pickupLocation : Text;
    dropLocation : Text;
    dateTime : Text;
    notes : Text;
  };

  var bookingRequests : [BookingRequest] = [];

  // Public endpoint - anyone can submit a booking request (including guests)
  public shared ({ caller }) func submitBookingRequest(request : BookingRequest) : async () {
    bookingRequests := bookingRequests.concat([request]);
  };

  // Admin-only endpoint - viewing all bookings is sensitive business data
  public query ({ caller }) func getAllBookingRequests() : async [BookingRequest] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all booking requests");
    };
    bookingRequests;
  };

  // Admin-only endpoint - filtering bookings is sensitive business data
  public query ({ caller }) func getBookingsByServiceType(serviceType : Text) : async [BookingRequest] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can filter booking requests");
    };
    bookingRequests.values().filter(func(request) { request.serviceType == serviceType }).toArray();
  };
};
