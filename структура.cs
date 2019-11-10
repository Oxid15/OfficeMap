struct User
{
    int userId;
    string login;
    string lastName;
    string firstName;
    string middleName;
    string picture;
    boolean isAdmin;
    string email;  
}
    
struct Map 
{
    string url;

}
struct Location
{
    string placeId;
    int userId;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
}


    User addUser(string login, string lastName,
    string firstName, string middleName, string picture, string email) {}         

    User updateUser(int userId){}

    User getUser(int userId){}

    User deleteUser(int userId){} 

    User[] getUsers(){}

    Location getLocationByUser(int userId){}

    Location[] getLocations(){}

    User[] findUsers(string query){}

    Location addLocation(string placeId){}

    Location deleteUser(string placeId){}

    string getMapUrl(){}
