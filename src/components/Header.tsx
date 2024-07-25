import { Popover, Transition } from '@headlessui/react';
import { Bars4Icon as MenuIcon, XMarkIcon as XIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import React, { Fragment, useEffect, useState } from 'react';
import config from '../config/index.json';

const Header = () => {
  const { company } = config;
  const { logo, name: companyName } = company;
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram) {
      const { user } = window.Telegram.WebApp.initData;
      setFirstName(user.first_name);
    }
  }, []);

  return (
    <>
      <div className='flex justify-between px-2 pt-3 md:gap-x-4' id='header'>
        <Link href='/' className='hidden md:flex items-center'>
          <span className='sr-only'>{companyName}</span>
          <img className='h-8 w-auto' src={logo} alt='Company Logo' />
          <span className='hidden pl-2 text-xl font-bold text-primary md:inline'>{companyName}</span>
        </Link>
        <Popover className='mx-2 self-center sm:mx-0'>
          <nav className='flex items-center justify-between gap-8 sm:h-10 lg:justify-start'>
            <Popover.Button className='inline-flex items-center justify-center p-2 text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary'>
              <span className='sr-only'>Open main menu</span>
              <MenuIcon className='h-6 w-6' aria-hidden='true' />
            </Popover.Button>
          </nav>
          <Transition as={Fragment} enter='duration-150 ease-out' enterFrom='opacity-0 scale-95' enterTo='opacity-100 scale-100' leave='duration-100 ease-in' leaveFrom='opacity-100 scale-100' leaveTo='opacity-0 scale-95'>
            <Popover.Panel focus className='absolute right-0 z-30 w-72 p-2 transform transition'>
              <div className='rounded-lg bg-background shadow-md ring-1 ring-black ring-opacity-5'>
                <div className='flex items-center justify-between px-5 pt-4'>
                  <img className='h-8 w-auto' src={logo} alt='Company Logo' />
                  <Popover.Button className='inline-flex items-center justify-center p-2 text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary'>
                    <span className='sr-only'>Close main menu</span>
                    <XIcon className='h-6 w-6' aria-hidden='true' />
                  </Popover.Button>
                </div>
                <div className='space-y-1 px-2 pt-2 pb-3'>
                  <Link href='/' className='block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50'>
                    Home {firstName && <span>First Name: {firstName}</span>}
                  </Link>
                  <Link href='/blog' className='block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50'>
                    Blog
                  </Link>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
      </div>
    </>
  );
};

export default Header;
