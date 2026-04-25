import type { SkillIconKey } from '../skillIconMap'

export const person = {
  name: 'Boeurn Mnor',
  title: 'Full Stack Developer',
  email: 'bourenmno1111@gmail.com',
  linkedin: 'https://www.linkedin.com/in/mnor-boeurn-2462512aa/',
  github: 'https://github.com/MnorDevkh',
  bioParagraphs: [
    'I am a Full Stack Developer currently working at The Lab Cambodia and pursuing a Master of Computer Science at the AGA Institute.',
    'I have completed over 1,500 hours of intensive software engineering training at the Korea Software HRD Center.',
    'I specialize in bridging complex backend logic with high-quality frontend design, aiming to contribute to Cambodia’s growing technology sector.',
  ],
} as const

export type SkillItem = { label: string; iconKey: SkillIconKey }

export const skillGroups: { title: string; items: SkillItem[] }[] = [
  {
    title: 'Frontend',
    items: [
      { label: 'Vue.js', iconKey: 'vue' },
      { label: 'ReactJS', iconKey: 'react' },
      { label: 'Ant Design', iconKey: 'antd' },
      { label: 'HTML5', iconKey: 'html5' },
      { label: 'CSS3 (FlexBox)', iconKey: 'css3' },
      { label: 'JavaScript (ES6+)', iconKey: 'javascript' },
      { label: 'Bootstrap 4', iconKey: 'bootstrap' },
    ],
  },
  {
    title: 'Backend',
    items: [
      { label: 'Java (J2SE, J2EE)', iconKey: 'java' },
      { label: 'Spring Boot', iconKey: 'springboot' },
      { label: 'Spring Data JPA', iconKey: 'springdata' },
      { label: 'Hibernate', iconKey: 'hibernate' },
      { label: 'MyBatis', iconKey: 'mybatis' },
      { label: 'Spring Security', iconKey: 'springsec' },
      { label: 'JWT', iconKey: 'jwt' },
    ],
  },
  {
    title: 'Database',
    items: [
      { label: 'PostgreSQL', iconKey: 'postgres' },
      { label: 'MySQL', iconKey: 'mysql' },
      { label: 'Data Modeling', iconKey: 'datamodel' },
      { label: 'SQL', iconKey: 'sql' },
    ],
  },
  {
    title: 'Mobile',
    items: [
      { label: 'Android SDK', iconKey: 'android' },
      { label: 'MVVM', iconKey: 'mvvm' },
      { label: 'Hilt', iconKey: 'hilt' },
      { label: 'RxJava', iconKey: 'rxjava' },
      { label: 'OneSignal', iconKey: 'onesignal' },
    ],
  },
]

export const projects = [
  {
    title: 'Operations Dashboard (Vue + Spring)',
    description:
      'An internal dashboard for monitoring service health and user activity. Delivers real-time charts, role-based views, and integrates with a Spring Boot API secured with JWT.',
    stack: ['Vue.js', 'Ant Design', 'Spring Boot', 'PostgreSQL', 'JWT'],
    href: '#',
  },
  {
    title: 'E-Commerce REST Platform',
    description:
      'A modular backend for catalog, cart, and checkout flows with Hibernate and Spring Data JPA. Includes inventory rules, audit logging, and MyBatis for reporting queries.',
    stack: ['Java', 'Spring Boot', 'Hibernate', 'MyBatis', 'MySQL'],
    href: '#',
  },
  {
    title: 'Field Service Mobile App',
    description:
      'An Android client for technicians to sync jobs offline, receive push updates, and capture proof-of-work. Built with MVVM, Hilt, and RxJava against a JSON API.',
    stack: ['Android SDK', 'MVVM', 'Hilt', 'RxJava', 'OneSignal'],
    href: '#',
  },
] as const
