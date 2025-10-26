import React from 'react';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { Services } from './components/Services.tsx';
import { MobileWork } from './components/MobileWork.tsx';
import { Team } from './components/Team.tsx';
import { TechStack } from './components/TechStack.tsx';
import { Projects } from './components/Projects.tsx';
import { Footer } from './components/Footer.tsx';
import { LanguageProvider, useLanguage } from './context/LanguageContext.tsx';
import type { MobileProject } from './types.ts';

const app1Screens = [
  'https://res.cloudinary.com/duuvvgniq/image/upload/v1761390139/Home_1_jhs8uh.png',
      'https://res.cloudinary.com/duuvvgniq/image/upload/v1761390138/Checkout_1_gnxfpv.png',

  'https://res.cloudinary.com/duuvvgniq/image/upload/v1761390138/Cart_1_ioojm9.png',

  
  'https://res.cloudinary.com/duuvvgniq/image/upload/v1761390138/Checkout_3_qw0rei.png',
    'https://res.cloudinary.com/duuvvgniq/image/upload/v1761390140/splash-1_onjftr.png',

];

const app2Screens = [
  'https://res.cloudinary.com/duuvvgniq/image/upload/v1761393734/Homepage_w6173h.png',
  'https://res.cloudinary.com/duuvvgniq/image/upload/v1761393721/Conversation_eyc6mm.png',
  'https://res.cloudinary.com/duuvvgniq/image/upload/v1761393735/Doctor_Speciality_Screen_rrml2r.png',
  
  'https://res.cloudinary.com/duuvvgniq/image/upload/v1761393736/Find_Nearby_Screen_gb2ezl.png',
  'https://res.cloudinary.com/duuvvgniq/image/upload/v1761393736/Notification_fmryzi.png'
];

const app3Screens = [
    'https://res.cloudinary.com/dsnz5chtc/image/upload/v1761473856/Screenshot_1761433467_vkfxzr.png',
    'https://res.cloudinary.com/dsnz5chtc/image/upload/v1761473856/Screenshot_1761433447_gohkv8.png',
    'https://res.cloudinary.com/dsnz5chtc/image/upload/v1761473853/Screenshot_1761433438_g2kmft.png',
    'https://res.cloudinary.com/dsnz5chtc/image/upload/v1761473857/Screenshot_1761433477_c2kea2.png',
    'https://res.cloudinary.com/dsnz5chtc/image/upload/v1761473856/Screenshot_1761399167_nndqaq.png',
    
];

const app4Screens = [
    'https://res.cloudinary.com/duuvvgniq/image/upload/v1761468800/unnamed_ryock2.webp',
    'https://res.cloudinary.com/duuvvgniq/image/upload/v1761468804/unnamed_1_hovgbg.webp',
    'https://res.cloudinary.com/duuvvgniq/image/upload/v1761468801/unnamed_6_zilioq.webp',
    'https://res.cloudinary.com/duuvvgniq/image/upload/v1761468800/unnamed_2_ai7wrm.webp',
    'https://res.cloudinary.com/duuvvgniq/image/upload/v1761468799/unnamed_3_qnlrpz.webp',
];

const app5Screens = [
    'https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/6b/e2/55/6be255ef-dbec-43e9-1015-dd3de289fed0/4227e237-82fa-49c7-914c-d751f3ca0d9a_Simulator_Screen_Shot_-_iPhone_14_Plus_-_2023-08-31_at_10.25.42.png/1000x0w.webp',

    'https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/8f/55/d1/8f55d189-4962-4962-628b-c76d5871cc3c/db558b52-98cb-40e0-9e6c-e9928245643b_Simulator_Screen_Shot_-_iPhone_14_Plus_-_2023-08-31_at_10.29.28.png/1000x0w.webp',

  'https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/fd/1f/62/fd1f6223-c7b0-46fd-11f2-133afcb65b07/5f793928-b528-4e87-9813-5065caf9759a_Simulator_Screen_Shot_-_iPhone_14_Plus_-_2023-08-31_at_10.30.06.png/1000x0w.webp',
  'https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/63/80/7c/63807ccf-176e-883e-d66f-382e8769215e/e0609411-6559-4386-bc88-1b412fbee472_Simulator_Screen_Shot_-_iPhone_14_Plus_-_2023-08-31_at_10.26.35.png/1000x0w.webp',
  'https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/51/d2/0a/51d20a2f-6fee-ad1b-1634-1bd4fb06bff2/50ad1dd5-ff7c-4e1f-8a87-ffcf7979984e_Simulator_Screen_Shot_-_iPhone_14_Plus_-_2023-08-31_at_10.29.44.png/1000x0w.webp'
];

const mobileProjects: MobileProject[] = [
  {
    titleKey: 'mobile_work_one_title',
    subtitleKey: 'mobile_work_one_subtitle',
    imageUrls: app1Screens,
  },
  {
    titleKey: 'mobile_work_two_title',
    subtitleKey: 'mobile_work_two_subtitle',
    imageUrls: app2Screens,
  },
  {
    titleKey: 'mobile_work_three_title',
    subtitleKey: 'mobile_work_three_subtitle',
    imageUrls: app3Screens,
  },
  {
    titleKey: 'mobile_work_four_title',
    subtitleKey: 'mobile_work_four_subtitle',
    imageUrls: app4Screens,
  },
  {
    titleKey: 'mobile_work_five_title',
    subtitleKey: 'mobile_work_five_subtitle',
    imageUrls: app5Screens,
  },
];

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-primary flex items-center justify-center z-[100]">
      <div className="flex space-x-2 rtl:space-x-reverse">
        <div className="w-4 h-4 rounded-full bg-accent animate-pulse"></div>
        <div className="w-4 h-4 rounded-full bg-accent animate-pulse" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-4 h-4 rounded-full bg-accent animate-pulse" style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>
  );
};

const AppContent: React.FC = () => {
  const { isLoading } = useLanguage();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="bg-primary min-h-screen overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <Services />
        <Team />
        <MobileWork projects={mobileProjects} />
        <Projects />
        <TechStack />
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;