import React from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom'; 

const navigation = [
    { name: 'Dashboard', href: '/dashboard', current: false },
    { name: 'About Us', href: '#Aboutus', current: false },
    { name: 'Tutorials', href: '#tutorials', current: false },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleSignOut = () => {
        // Clear user session (example using localStorage)
        localStorage.removeItem('authToken');  // Adjust this based on your authentication logic
        // Redirect to Home
        navigate('/');
    };

    return (
        <Disclosure as="nav" className="bg-[#F96E2A]">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-[#FBF8EF] hover:bg-[#F96E2A] hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                            <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
                        </DisclosureButton>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center">
                            <span className="text-white text-xl font-bold">EdgeInsights</span>
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        aria-current={item.current ? 'page' : undefined}
                                        className={classNames(
                                            item.current ? 'bg-[#F96E2A] text-white' : 'text-[#FBF8EF] hover:bg-[#F96E2A] hover:text-white',
                                            'rounded-md px-3 py-2 text-sm font-medium',
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <button
                            type="button"
                            className="relative rounded-full bg-[#F96E2A] p-1 text-[#FBF8EF] hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#F96E2A]"
                        >
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">View notifications</span>
                            <BellIcon aria-hidden="true" className="h-6 w-6" />
                        </button>

                        <Menu as="div" className="relative ml-3">
                            <div>
                                <MenuButton className="relative flex rounded-full bg-[#F96E2A] text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#F96E2A]">
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">Open user menu</span>
                                    <img
                                        alt=""
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        className="h-8 w-8 rounded-full"
                                    />
                                </MenuButton>
                            </div>
                            <Menu.Items 
                                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-[#FBF8EF] py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none">
                                <Menu.Item>
                                    <Link to="/yourprofile" className="block px-4 py-2 text-sm text-[#F96E2A] hover:bg-[#C9E6F0]">
                                        Your Profile
                                    </Link>
                                </Menu.Item>
                                <Menu.Item>
                                    <Link to="#" className="block px-4 py-2 text-sm text-[#F96E2A] hover:bg-[#C9E6F0]">
                                        Settings
                                    </Link>
                                </Menu.Item>
                                <Menu.Item>
                                    <button onClick={handleSignOut} className="block px-4 py-2 text-sm text-[#F96E2A] hover:bg-[#C9E6F0]">
                                        Sign out
                                    </button>
                                </Menu.Item>
                            </Menu.Items>
                        </Menu>
                    </div>
                </div>
            </div>

            <DisclosurePanel className="sm:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2">
                    {navigation.map((item) => (
                        <DisclosureButton
                            key={item.name}
                            as={Link}
                            to={item.href}
                            aria-current={item.current ? 'page' : undefined}
                            className={classNames(
                                item.current ? 'bg-[#F96E2A] text-white' : 'text-[#FBF8EF] hover:bg-[#F96E2A] hover:text-white',
                                'block rounded-md px-3 py-2 text-base font-medium',
                            )}
                        >
                            {item.name}
                        </DisclosureButton>
                    ))}
                </div>
            </DisclosurePanel>
        </Disclosure>
    );
}
