import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import SignUpImage from '../../images/vector/signup.svg';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log(API_BASE_URL);

const lkMobile = /^(?:0|94)?(7[0-9]{8})$/;

const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z
    .string()
    .email({ message: 'Invalid email address' })
    .refine((email) => email.endsWith('@sab.ac.lk'), {
      message: 'Invalid organization email. Only @sab.ac.lk emails are allowed',
    }),
  mobile: z.string().regex(lkMobile, { message: 'Invalid mobile number' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
  faculty: z.enum(
    [
      'agriculture_sciences',
      'applied_sciences',
      'computing',
      'geomatics',
      'graduate_studies',
      'management_studies',
      'medicine',
      'social_sciences',
      'technology',
    ],
    { message: 'Invalid faculty selection' },
  ),
});

type FormValues = z.infer<typeof formSchema>;

type SignUpFormProps = {
  onSuccess?: () => void;
  user?: {
    name: string;
    email: string;
    mobile: string;
    password: string;
    faculty: string;
  };
};

const SignUp: React.FC<SignUpFormProps> = ({ onSuccess, user }) => {
  const [serverError, setServerError] = useState('');

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: user
      ? {
          name: user.name,
          email: user.email,
          password: '',
          mobile: '',
          faculty: 'computing',
        }
      : undefined,
    resolver: zodResolver(formSchema),
  });

  const navigate = useNavigate();

  async function onSubmit(data: FormValues) {
    console.log(data);
    try {
      if (user) {
        await axios.patch(`${API_BASE_URL}/users/signup/`, data);
      } else {
        const response = await axios.post(`${API_BASE_URL}/users/signup`, data);
        //console.log(response.data.signupdata.user);
        const userData = response.data.signupdata.user;
        if (!response.data.signupdata.email) {
          setServerError('Email already exists');
        }
        const token = response.data.signupdata.token;
        if (token) {
          localStorage.setItem('jwt', token);
          Object.keys(userData).forEach((key) => {
            localStorage.setItem(key, userData[key]);
          });
          navigate('/');
        }
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  }

  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex flex-wrap items-center">
            <div className="hidden w-full xl:block xl:w-1/2">
              <div className="py-17.5 px-26 text-center">
                <Link className="mb-5.5 inline-block" to="/">
                  <h2 className="text-4xl font-bold">EventSync</h2>
                </Link>
                <p className="2xl:px-20">
                  Join our community and unlock a world of streamlined event
                  planning.
                </p>
                <span className="mt-15 inline-block">
                  <img src={SignUpImage} alt="sign up image" />
                </span>
              </div>
            </div>
            <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
              <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                <span className="mb-1.5 block font-medium">
                  One more step to browse events
                </span>
                <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                  Sign Up to Eventsync
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} autoComplete="on">
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Enter your full name"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        {...register('name')}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm">
                          {errors.name.message}
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
                              d="M11.0008 9.52185C13.5445 9.52185 15.607 7.5281 15.607 5.0531C15.607 2.5781 13.5445 0.584351 11.0008 0.584351C8.45703 0.584351 6.39453 2.5781 6.39453 5.0531C6.39453 7.5281 8.45703 9.52185 11.0008 9.52185ZM11.0008 2.1656C12.6852 2.1656 14.0602 3.47185 14.0602 5.08748C14.0602 6.7031 12.6852 8.00935 11.0008 8.00935C9.31641 8.00935 7.94141 6.7031 7.94141 5.08748C7.94141 3.47185 9.31641 2.1656 11.0008 2.1656Z"
                              fill=""
                            />
                            <path
                              d="M13.2352 11.0687H8.76641C5.08828 11.0687 2.09766 14.0937 2.09766 17.7719V20.625C2.09766 21.0375 2.44141 21.4156 2.88828 21.4156C3.33516 21.4156 3.67891 21.0719 3.67891 20.625V17.7719C3.67891 14.9531 5.98203 12.6156 8.83516 12.6156H13.2695C16.0883 12.6156 18.4258 14.9187 18.4258 17.7719V20.625C18.4258 21.0375 18.7695 21.4156 19.2164 21.4156C19.6633 21.4156 20.007 21.0719 20.007 20.625V17.7719C19.9039 14.0937 16.9133 11.0687 13.2352 11.0687Z"
                              fill=""
                            />
                          </g>
                        </svg>
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="mb-2.5 block font-medium text-black dark:text-white"
                    >
                      Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        autoComplete="new-password"
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
                      Mobile
                    </label>
                    <div className="relative">
                      <input
                        type="phone"
                        autoComplete="tel"
                        placeholder="Enter your mobile number"
                        className="appearance-none w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        {...register('mobile')}
                      />
                      {errors.mobile && (
                        <p className="text-red-500 text-sm">
                          {errors.mobile.message}
                        </p>
                      )}
                      <span className="absolute right-4 top-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          width={22}
                          height={22}
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="opacity-50"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                          />
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

                  <div className="mb-6">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Faculty
                    </label>
                    <div className="relative z-20 bg-white dark:bg-form-input">
                      <select
                        {...register('faculty')}
                        className="relative z-20 w-full appearance-none rounded-lg border border-stroke bg-transparent py-4 px-6 outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      >
                        <option value="">Select your faculty</option>
                        <option value="agriculture_sciences">
                          Faculty of Agriculture Sciences
                        </option>
                        <option value="applied_sciences">
                          Faculty of Applied Sciences
                        </option>
                        <option value="computing">Faculty of Computing</option>
                        <option value="geomatics">Faculty of Geomatics</option>
                        <option value="graduate_studies">
                          Faculty of Graduate Studies
                        </option>
                        <option value="management_studies">
                          Faculty of Management Studies
                        </option>
                        <option value="medicine">Faculty of Medicine</option>
                        <option value="social_sciences">
                          Faculty of Social Sciences
                        </option>
                        <option value="technology">
                          Faculty of Technology
                        </option>
                      </select>
                      {errors.faculty && (
                        <p className="text-red-500 text-sm">
                          {errors.faculty.message}
                        </p>
                      )}
                      <span className="absolute top-1/2 right-6 z-10 -translate-y-1/2">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M12 14.8293L5.20711 8.03644L4.79289 8.45066L12 15.6578L19.2071 8.45066L18.7929 8.03644L12 14.8293Z"
                              fill="#637381"
                            />
                          </g>
                        </svg>
                      </span>
                    </div>
                  </div>

                  <button
                    className="flex w-full justify-center rounded-lg bg-primary p-4 text-white transition hover:bg-opacity-90"
                    type="submit"
                  >
                    Sign Up
                  </button>
                </form>
                <div className="mt-6 text-center">
                  <p>
                    Already have an account?{' '}
                    <Link to="/auth/signin" className="text-primary">
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
