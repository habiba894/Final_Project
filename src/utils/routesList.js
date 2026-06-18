const RoutesList = {
    Login: "/auth/login",
    Signup: "/auth/signup",
    Home: "/home",
    Profile: "/profile",
    Subscription: "/subscription",

    CountryRoute: "/country/:countryName",
    Country: (countryName) => `/country/${countryName}`,
    TripPlanRoute: "/country/:countryName/trip-plan",
    TripPlan: (countryName) => `/country/${countryName}/trip-plan`,
};

export default RoutesList;