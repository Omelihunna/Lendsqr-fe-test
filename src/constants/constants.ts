export const navItems = [
    {
        title: 'Switch Organization',
        icon: '/images/icons/nav-icon-13.svg',
        link: '#',
        id: 1,
    },
    {
        title: 'Dashboard',
        icon: '/images/icons/home.svg',
        link: '/dashboard',
        id: 2,
    },
    {
        title: 'Customers',
        header: true,
        link: '',
        id: 3,
    },
    {
        title: 'Users',
        icon: '/images/icons/nav-icon-4.svg',
        link: '/dashboard/users',
        id: 4,
    },
    {
        title: 'Guarantors',
        icon: '/images/icons/nav-icon-5.svg',
        link: '#',
        id: 5,
    },
    {
        title: 'Loan',
        icon: '/images/icons/nav-icon-6.svg',
        link: '#',
        id: 6,
    },
    {
        title: 'Decision Models',
        icon: '/images/icons/nav-icon-7.svg',
        link: '#',
        id: 7,
    },
    {
        title: 'Savings',
        icon: '/images/icons/nav-icon-8.svg',
        link: '#',
        id: 8,
    },
    {
        title: 'Loan Requests',
        icon: '/images/icons/nav-icon-9.svg',
        link: '#',
        id: 9,
    },
    {
        title: 'Whitelist',
        icon: '/images/icons/nav-icon-10.svg',
        link: '#',
        id: 10,
    },
    {
        title: 'Karma',
        icon: '/images/icons/nav-icon-11.svg',
        link: '#',
        id: 11,
    },
    {
        title: 'Businesses',
        header: true,
        link: '',
        id: 12,
    },
    {
        title: 'Organization',
        icon: '/images/icons/nav-icon-13.svg',
        link: '#',
        id: 13,
    },
    {
        title: 'Loan Products',
        icon: '/images/icons/nav-icon-14.svg',
        link: '#',
        id: 14,
    },
    {
        title: 'Savings Products',
        icon: '/images/icons/nav-icon-15.svg',
        link: '#',
        id: 15,
    },
    {
        title: 'Fees and Charges',
        icon: '/images/icons/nav-icon-16.svg',
        link: '#',
        id: 16,
    },
    {
        title: 'Transactions',
        icon: '/images/icons/nav-icon-17.svg',
        link: '#',
        id: 17,
    },
    {
        title: 'Services',
        icon: '/images/icons/nav-icon-18.svg',
        link: '#',
        id: 18,
    },
    {
        title: 'Service Account',
        icon: '/images/icons/nav-icon-19.svg',
        link: '#',
        id: 19,
    },
    {
        title: 'Settlements',
        icon: '/images/icons/nav-icon-20.svg',
        link: '#',
        id: 20,
    },
    {
        title: 'Reports',
        icon: '/images/icons/nav-icon-21.svg',
        link: '#',
        id: 21,
    },
    {
        title: 'Settings',
        header: true,
        link: '',
        id: 22,
    },
    {
        title: 'Preferences',
        icon: '/images/icons/nav-icon-23.svg',
        link: '#',
        id: 23,
    },
    {
        title: 'Fees and Pricing',
        icon: '/images/icons/nav-icon-24.svg',
        link: '#',
        id: 24,
    },
    {
        title: 'Audit Logs',
        icon: '/images/icons/nav-icon-25.svg',
        link: '#',
        id: 25,
    },
    {
        title: 'Systems Messages',
        icon: '/images/icons/nav-icon-26.svg',
        link: '#',
        id: 26,
    },
];

export const usersStats = [
    {
        title: 'Users',
        icon: '/images/icons/user-stat-icon-1.svg',
        count: '2,453',
    },
    {
        title: 'Active Users',
        icon: '/images/icons/user-stat-icon-2.svg',
        count: '2,453',
    },
    {
        title: 'Users with loans',
        icon: '/images/icons/user-stat-icon-3.svg',
        count: '12,453',
    },
    {
        title: 'Users with savings',
        icon: '/images/icons/user-stat-icon-4.svg',
        count: '102,453',
    },
];

const status = [
    "Active",
    "Pending",
    "Blacklisted",
    "Inactive",
]

export const getRandomStatus = () => status[Math.floor(Math.random() * status.length)];

export interface UserModel {
    accountBalance: string,
    accountNumber: string,
    createdAt: string,
    education: never,
    email: string,
    guarantor: never,
    id: string,
    lastActiveDate: string,
    orgName: string,
    phoneNumber: string,
    profile: string,
    socials: never,
    userName: string,
}

export interface User {
    id: string;
    bvn: string;
    email: string;
    gender: string;
    status: string;
    avatar: string;
    socials: {
        twitter: string;
        facebook: string;
        instagram: string;
    };
    children: number;
    fullName: string;
    username: string;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    dateJoined: string; // ISO date string
    phoneNumber: string;
    emailAddress: string;
    organization: string;
    maritalStatus: string;
    typeOfResidence: string;
    guarantor: {
        address: string;
        fullName: string;
        phoneNumber: string;
        relationship: string;
    };
    accountNumber: string;
    accountBalance: string;
    educationAndEmployment: {
        officeEmail: string;
        loanRepayment: string; // or number if parsed
        monthlyIncome: string; // or number if parsed
        employmentStatus: string;
        levelOfEducation: string;
        sectorOfEmployment: string;
        durationOfEmployment: string;
    };
}

export const CACHE_TTL_MS = 1000 * 60 * 10;

    export
    const
    userNavItems: string[]
    =
    ['General Details',
    'Documents',
    'Bank Details',
    'Loans',
    'Savings',
    'App and System'
    ];