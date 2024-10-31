import Image from "next/image";

import { Hero } from "@/components/Hero";
import { Seo } from "@/components/Seo";
import { Layout } from "@/components/Layout";
import { Community } from "@/components/Community";
import { Avatar } from "@/components/Avatar";
import { Sponsors } from "@/components/Sponsors";

import allSocialMedia from '@/all-social-media'
import allCommunities from "@/all-communities";
import allFounders from "@/all-founders";
import allSponsors from "@/all-sponsors";

import ReflectedSunImage from "../../public/images/reflected-sun.svg";
import ReflectedClouldsImage from "../../public/images/reflected-cloulds.svg";
import GreenBlockImage from "../../public/images/green-block.svg";

import { getEventsFromCalendar } from '@/utils/google-calendar'


const { communities } = allCommunities;
const { founders } = allFounders;
const { social } = allSocialMedia;
const { sponsors } = allSponsors;

const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;

export const getServerSideProps = async () => {
  let events = []

  try {
    events = await getEventsFromCalendar()
  } catch (e) {
    console.error('getServerSideProps', e)
  }

  return {
    props: {
      events
    }
  }
}

const home = ({ events }) => {
  return (
    <>
      <Seo
        title='Caribe Dev'
        description='Caribe Dev, la comunidad para los desarrolladores del Caribe Colombiano.'
        image={`${DOMAIN}/images/caribe-dev-hero.png`}
      />
      <Hero events={events} />
      <section
        id='communities'
        className='bg-secondary-hero relative -mt-[20px] md:-mt-[34px] pb-[30px]'
      >
        <div className='absolute top-0 left-0 right-0 flex justify-center w-full'>
          <ReflectedSunImage className='w-[76%] md:w-[49%]' />
        </div>
        <div className='absolute left-0 right-0 justify-center w-full md:flex md:top-0'>
          <ReflectedClouldsImage className='w-[100%] z-0' />
        </div>
        <Layout className='relative md:mt-16'>
          <h2 id='communities' className='text-[35px] md:text-[60px] pt-20 text-tertiary'>
            Comunidades
          </h2>
          <div className='flex flex-wrap justify-center items-center pt-[50px]'>
            <section className="flex flex-wrap justify-center gap-4 pt-6 md:pt-0">
              {communities.map((comunity) => <Community key={comunity.website} {...comunity} />)}
            </section>
          </div>
          <h2 id='sponsors' className='text-[35px] md:text-[60px] pt-20 text-tertiary'>
            Sponsors
          </h2>
          <section className="flex flex-wrap justify-center gap-4 pt-6 md:pt-50">
            {sponsors.map((sponsor) => <Sponsors key={sponsor.website} {...sponsor} />)}
          </section>
          <h2 id='founders' className='text-[35px] md:text-[60px] pt-20 text-tertiary'>
            Fundadores
          </h2>
          <div className='flex flex-wrap justify-center items-center pt-[50px]'>
            {founders.map(({ name, image, social }) => {
              return (
                <div className='flex justify-center basis-[20%] mb-12' key={name}>
                  <Avatar name={name} image={image} social={social} />
                </div>
              );
            })}
          </div>
          <div className='flex justify-center pt-2'>
            <a
              href={social[2].url}
              className='text-tertiary text-[20px] justify-center items-center rounded-2xl bg-secondary px-[60px] py-[25px] font-bold hover:opacity-90'
              target='_blank'
            >
              Haz parte del equipo
            </a>
          </div>
        </Layout>
      </section>
      <section id='about-us' className='relative overflow-hidden'>
        <div className='absolute flex justify-center w-full'>
          <GreenBlockImage className='w-full' />
        </div>
        <Layout className='relative pt-20 md:pt-40 pb-[70px]'>
          <div className='flex justify-between'>
            <div className='flex flex-col basis-[100%] md:basis-[65%]'>
              <h2 className='text-[35px] md:text-[60px] text-tertiary'>Nosotros</h2>
              <p className='text-tertiary font-medium mt-[20px] text-[18px] md:text-[20px] max-w-[1000px] w-full'>
                Somos líderes que buscamos brindar un espacio para aprender y compartir
                con nuestras comunidades de tecnología en la Costa Caribe, donde nos
                conozcan y así poder ofrecerles oportunidades y experiencias únicas, que
                promuevan la innovación y la creatividad en la ciudad!
              </p>
            </div>
            <div className='hidden basis-[30%] mt-2 md:block'>
              <Image
                src='/images/small-caribe-dev.svg'
                alt='Small Caribe Dev logo'
                width={200}
                height={200}
              />
            </div>
          </div>
          <div className='relative mt-10 w-full h-[400px]'>
            <Image
              className='object-cover rounded-3xl'
              src='/images/nosotros.jpeg'
              alt='Reunion de la comunidad'
              fill
            />
          </div>
        </Layout>
      </section>
    </>
  )
};

export default home
