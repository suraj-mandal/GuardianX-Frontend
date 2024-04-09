class UserRegistrationDto {
    fullName: string;
    phoneNumber: string;
    password: string;

    constructor(fullName: string, phoneNumber: string, password: string) {
        this.fullName = fullName;
        this.phoneNumber = phoneNumber;
        this.password = password;
    }
}


class UserDto {
    id: string;
    fullName: string;
    phoneNumber: string;

    constructor(id: string, fullName: string, phoneNumber: string) {
        this.id = id;
        this.fullName = fullName;
        this.phoneNumber = phoneNumber;
    }
}

class UserLoginDto {
    phoneNumber: string;
    password: string;

    constructor(phoneNumber: string, password: string) {
        this.password = password;
        this.phoneNumber = phoneNumber;
    }

}

export {UserDto, UserRegistrationDto, UserLoginDto}