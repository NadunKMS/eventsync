import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SignInImage from '../../images/vector/signin.svg';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const formSchema = z.object({
  email: z
    .string()
    .email({ message: 'Invalid email address' })
    .refine((email) => email.endsWith('@sab.ac.lk'), {
      message: 'Invalid organization email. Only @sab.ac.lk emails are allowed',
    }),
  password: z.string().min(6, { message: 'Password required' }),
});

type FormValues = z.infer<typeof formSchema>;

type SignUpFormProps = {
  onSuccess?: () => void;
  user?: {
    email: string;
    password: string;
  };
};

const SignIn: React.FC<SignUpFormProps> = ({ onSuccess, user }) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: user
      ? {
          email: user.email,
          password: '',
        }
      : undefined,
    resolver: zodResolver(formSchema),
  });

  const navigate = useNavigate();

  async function onSubmit(data: FormValues) {
    console.log(data);
    try {
      const response = await axios.post(`${API_BASE_URL}/users/login`, data, {
        withCredentials: true,
      });
      const userData = response.data.logindata.user;
      const token = response.data.logindata.token;
      localStorage.setItem('jwt', token);
      Object.keys(userData).forEach((key) => {
        localStorage.setItem(key, userData[key]);
      });
      navigate('/');
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  }

  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <div className="rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark my-2">
          <div className="flex flex-wrap items-center">
            <div className="hidden w-full xl:block xl:w-1/2">
              <div className="py-17.5 px-26 text-center">
                <Link className="mb-5.5 inline-block" to="/">
                  <h2 className="text-4xl font-bold">EventSync</h2>
                </Link>

                <p className="2xl:px-20">
                  Access your event management tools effortlessly with just a
                  few clicks.
                </p>

                <span className="mt-15 inline-block">
                  <img src={SignInImage} alt="sign in image" />
                </span>
              </div>
            </div>

            <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
              <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                <span className="mb-1.5 block font-medium">
                  One more step to browse events
                </span>
                <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                  Sign In to EventSync
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} autoComplete="on">
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        autoComplete="email"
                        placeholder="Enter your email"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        {...register('email')}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm">
                          {errors.email.message}
                        </p>
                      )}
                      <span className="absolute right-4 top-4">
                        <svg
                          className="fill-current"
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.5">
                            <path
                              d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2113L2.68281 4.84692H19.2516ZM19.2516 17.222H2.75156C2.31641 17.222 1.93516 16.8408 1.93516 16.4057V6.64917L10.6625 12.0304C10.8 12.0988 10.9375 12.1332 11.075 12.1332C11.2125 12.1332 11.3833 12.0988 11.4852 12.0304L20.1797 6.64917V16.4057C20.2141 16.8408 19.8328 17.222 19.2516 17.222Z"
                              fill=""
                            />
                          </g>
                        </svg>
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        autoComplete="current-password"
                        placeholder="Enter your password"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        {...register('password')}
                      />
                      {errors.password && (
                        <p className="text-red-500 text-sm">
                          {errors.password.message}
                        </p>
                      )}
                      <span className="absolute right-4 top-4">
                        <svg
                          className="fill-current"
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.5">
                            <path
                              d="M16.5013 9.68182H15.8726V7.99432C15.8726 5.34257 13.6288 3.09882 10.9771 3.09882C8.32531 3.09882 6.08156 5.34257 6.08156 7.99432V9.68182H5.45281C4.21719 9.68182 3.22266 10.6763 3.22266 11.9119V17.5919C3.22266 18.8275 4.21719 19.822 5.45281 19.822H16.5013C17.737 19.822 18.7316 18.8275 18.7316 17.5919V11.9119C18.7316 10.6763 17.737 9.68182 16.5013 9.68182ZM7.62891 7.99432C7.62891 5.91607 9.28156 4.26332 11.3598 4.26332C13.438 4.26332 15.0908 5.91607 15.0908 7.99432V9.68182H7.62891V7.99432ZM17.1978 17.5919C17.1978 18.0388 16.9485 18.2882 16.5013 18.2882H5.45281C5.00562 18.2882 4.75625 18.0388 4.75625 17.5919V11.9119C4.75625 11.4647 5.00562 11.2154 5.45281 11.2154H16.5013C16.9485 11.2154 17.1978 11.4647 17.1978 11.9119V17.5919Z"
                              fill=""
                            />
                            <path
                              d="M10.9772 13.1218C10.5303 13.1218 10.1166 13.3493 9.89656 13.7325C9.67656 14.1513 9.71156 14.6275 10.0003 15.0118C10.2203 15.395 10.6641 15.5875 11.108 15.5175C11.5522 15.4825 11.9616 15.255 12.1816 14.8718C12.4016 14.4887 12.3666 14.0125 12.0778 13.6287C11.8934 13.3493 11.4859 13.1218 10.9772 13.1218Z"
                              fill=""
                            />
                          </g>
                        </svg>
                      </span>
                    </div>
                  </div>

                  <div className="mb-5">
                    <input
                      type="submit"
                      value="Sign In"
                      className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                    />
                  </div>

                  <div className="mt-6 text-center">
                    <p>
                      Don’t have any account?{' '}
                      <Link to="/auth/signup" className="text-primary">
                        Sign Up
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
