import React from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useRouter } from 'next/dist/client/router'
import { format } from 'date-fns'
import InfoCard from '../components/InfoCard'

export default function Search({ searchResults }) {

    const router = useRouter();

    const {location,startDate,endDate,numOfGuests} = router.query;
    const formattedStartDate = format(new Date(startDate), "dd MMMM yy");
    const formatteEndDate = format(new Date(endDate), "dd MMMM yy");
    const range = `${formattedStartDate} - ${formatteEndDate}`;

  return (
    
    <div>
        <Head>
        <title>Airnbn</title>
        <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header placeholder={`${location} | ${range} | ${numOfGuests} guests `}/>

        <main className='flex '>
            <section className=' flex-grow pt-14 px-6'>
                <p className='text-xs '>300+ Stays - {range} - for {numOfGuests} guests</p>
                <h1 className='text-3xl font-semibold mt-2 mb-6'>Stays in {location}</h1>

                <div className=' hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap'>
                    <p className='button'>Cancellation Flexibility</p>
                    <p className='button'>Type of place</p>
                    <p className='button'>Price</p>
                    <p className='button'>Rooms and Beds</p>
                    <p className='button'>More filters</p>
                </div>

                <div className=' flex flex-col'>
                {searchResults?.map(
                    i => (
                        <InfoCard
                        key={i.img}
                        img = {i.img}
                        title = {i.title}
                        location = {i.location}
                        description={i.description}
                        star={i.star}
                        price={i.price}
                        total={i.total}
                        />
                    )
                )}
                </div>
                


            </section>
        </main>




        <Footer/>
    </div>
  )
}

export async function getServerSideProps(){
    const searchResults = await fetch("https://www.jsonkeeper.com/b/5NPS").then(
        (res=>res.json())
    );

    return {
        props : {
            searchResults,
        }
    }

}
