import useAuthentication from "../hooks/use-authentication.ts";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {performLogin} from "../lib/api.ts";
import toast from "react-hot-toast";
import LoginFormSchema from "./schema/login-form-schema.ts";

interface IUserLoginInputs {
    phoneNumber: string;
    password: string;
}

export default function LoginPage() {

    const {isLoggedIn} = useAuthentication();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm<IUserLoginInputs>({
        resolver: zodResolver(LoginFormSchema)
    });

    useEffect(() => {
        if (isLoggedIn) {
            navigate("");
        }
    }, [isLoggedIn, navigate]);

    const handleFormSubmit = (data: IUserLoginInputs) => {
        setLoading(true);
        performLogin(data.phoneNumber, data.password)
            .then((data) => {
                reset();
                console.log(data);
                toast.success("Login successful");
                navigate('/')
            })
            .catch((err) => {
                console.log(err);
                toast.error("No such user exists");
            })
            .finally(() => {
                setLoading(false);
            })
    }


    return (
        <div className="h-screen flex items-center font-inter">
            <div className="flex-1 flex flex-col items-center">
                <div className="rounded-md shadow-xl bg-white shadow-gray-200 sm:min-w-[450px] md:min-w-[512px]">
                    <form onSubmit={handleSubmit(handleFormSubmit)}>
                        <div className="px-8 py-4">
                            <h1 className="text-3xl font-roboto-slab text-gray-700 font-semibold">Perform Login</h1>
                        </div>
                        <hr/>
                        <div className="space-y-5 p-6 pb-4">
                            {/* basic section is here */}
                            <div className="flex flex-col space-y-1">
                                <label className="text-sm font-medium font-roboto" htmlFor="phoneNumber">Phone
                                    Number</label>
                                <input
                                    className="w-full p-2 bg-gray-100 border-2 border-gray-200 focus:outline-1 focus:outline-gray-400 focus:shadow-gray-50 focus:shadow rounded-md font-roboto text-sm"
                                    id="phoneNumber" type="text" {...register('phoneNumber')}/>
                                {errors.phoneNumber?.message &&
                                    <p className="text-sm font-medium font-roboto text-red-900">{errors.phoneNumber?.message}</p>}
                            </div>
                            <div className="flex flex-col space-y-1">
                                <label className="text-sm font-medium font-roboto" htmlFor="password">Password</label>
                                <input
                                    className="w-full p-2 bg-gray-100 border-2 border-gray-200 focus:outline-1 focus:outline-gray-400 focus:shadow-gray-50 focus:shadow rounded-md font-roboto text-sm"
                                    id="password" type="password" {...register('password')}/>
                                {errors.password?.message &&
                                    <p className="text-sm font-medium font-roboto text-red-900">{errors.password?.message}</p>}
                            </div>
                            <div className="flex flex-row items-center justify-center">
                                <button
                                    disabled={loading}
                                    type="submit"
                                    className="text-sm bg-gray-900 px-8 py-2 rounded-md text-gray-50 font-roboto font-medium">Submit
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}