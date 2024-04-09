import {UserDto, UserLoginDto, UserRegistrationDto} from "../models/user-dto.ts";
import axios from "axios";


async function performLogin(phoneNumber: string, password: string): Promise<UserDto> {
    const loginRequest = new UserLoginDto(phoneNumber, password);
    return axios.post('/api/auth/login', loginRequest);
}

function performRegistration(fullName: string, phoneNumber: string, password: string): Promise<string> {
    const registrationRequest = new UserRegistrationDto(fullName, phoneNumber, password);
    return axios.post('/api/auth/register', registrationRequest);
}

export {performLogin, performRegistration};