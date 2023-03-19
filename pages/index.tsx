import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import OpenAI from '@/components/openai'
import {Heading,Center,Box,Highlight } from '@chakra-ui/react'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      {/* 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 */}
      <Head>
        <title>EVE AI</title>
        <meta name="description" content="This is a Eve demo chat page" />
        <link rel="icon" href="/favicon.jpg" />
      </Head>
      <Center >
      <Box>
      <Heading className='my-5  text-center'>Welcome to Eve Chat Demo</Heading>
      <OpenAI />
    </Box>
    </Center>
    </>
  )
}
