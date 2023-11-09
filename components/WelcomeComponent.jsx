"use client"
import { exerciseDbStats } from '@/app/api/exerciseDbStatsService'
import primaryMuscles from '@/data/primary-muscles';
import React, { useEffect } from 'react'
import _, { debounce, set } from 'lodash'
import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import { GiWeightLiftingUp, GiWeight } from 'react-icons/gi';
import { FaRepeat } from 'react-icons/fa6'
import Image from 'next/image';

const quotes = [
    "Since using Iron Delirium, I accidentally bent my car door handle. It was just supposed to be cardio day!",
    "My biceps got so big, my shirts are filing a lawsuit for harassment.",
    "Thanks to Iron Delirium, I flexed and the power went out. Coincidence? I think not.",
    "I did a leg day on Iron Delirium and now I'm accidentally winning marathons on my way to work.",
    "I sneezed after a workout and now my wall needs plastering.",
    "Used Iron Delirium once, now I open jars for my entire neighborhood.",
    "I told my cat about my gains from Iron Delirium. Even he's intimidated now.",
    "After one Iron Delirium session, I was nominated as the new superhero in town.",
    "My six-pack from Iron Delirium is so defined, it just got an endorsement deal.",
    "One workout and now gravity respects me too much to bring me down.",
    "I high-fived a friend post-Iron Delirium workout and accidentally registered on the Richter scale.",
    "Iron Delirium made me so fit, my shadow can't keep up with me anymore.",
    "Did a push-up, ended up pushing the Earth.",
    "After using Iron Delirium, I arm-wrestled my reflection... and won.",
    "I dreamed of missing a workout, and my fitness tracker woke me up for an apology.",
    "Iron Delirium turned my 'dad bod' into a 'rad bod'.",
    "I did an Iron Delirium workout in the Sahara and accidentally started a new ocean.",
    "My fitness level post-Iron Delirium scares my gym equipment.",
    "I looked at a weight and it lifted itself. Iron Delirium effect!",
    "After using Iron Delirium, I can now hear colors and see sounds. That's normal, right?"
]


const WelcomeComponent = () => {
    const numUsers = 420
    const numWorkouts = 1234
    const numExerciseDb = 786
    const numSets = 12345
    const numReps = 12345
    const numWeight = "1.8 Mega Tonnes"
    const [stats, setStats] = React.useState({})
    const [isLoading, setIsLoading] = React.useState(true)


    useEffect(() => {
        const getStats = async () => {
            const res = await exerciseDbStats()
            setStats(res.data)
            setIsLoading(false)
        }
        getStats()
    }, [isLoading])

    return (

        <div className="flex flex-col items-center justify-center">
            <div className='mb-32 mt-12'>
                <h1 className="text-4xl font-bold text-center text-white">Welcome to Iron Delirium</h1>
                <h2 className="text-xl text-center text-white">The Workout Tracker for the Heavy Iron Addict</h2>
                <h3 className='"text-lg text-center text-white"'>Be the King Of the App - Be the Only User!</h3>
            </div>
            <div className='flex flex-row gap-6'>
                <StatBadge title="#Users Online" icon={<GiWeightLiftingUp />} value={numUsers} desc="69% more than last time" />
                <StatBadge title="#KG Lifted" icon="" value={numWeight} desc="Avg 145Kg per/rep" />
            </div>
            <div className='pt-6'>
                <StatBadge title="#Reps completed" icon={<FaRepeat />} value={numReps} desc="∞ Reps remaining" />
            </div>

            <div className="carousel rounded-box w-1/2">
                <div className="carousel-item">
                    <Image width={512 / 3} height={768 / 3} src="/darthvader_before.webp" alt="Drink" />
                </div>
                <div className="carousel-item">
                    <Image width={512 / 3} height={768 / 3} src="/darthvader_after.webp" alt="Drink" />
                </div>
                <div className="carousel-item">
                    <Image width={512 / 3} height={768 / 3} src="/harold_before.webp" alt="Drink" />
                </div>
                <div className="carousel-item">
                    <Image width={512 / 3} height={768 / 3} src="/harold_after.webp" alt="Drink" />
                </div>
                <div className="carousel-item">
                    <Image width={512 / 3} height={768 / 3} src="/stallone_before.webp" alt="Drink" />
                </div>
                <div className="carousel-item">
                    <Image width={512 / 3} height={768 / 3} src="/stallone_after.webp" alt="Drink" />
                </div>
                <div className="carousel-item">
                    <Image width={512 / 3} height={768 / 3} src="/steveb_before.webp" alt="Drink" />
                </div>
                <div className="carousel-item">
                    <Image width={512 / 3} height={768 / 3} src="/steveb_after2.webp" alt="Drink" />
                </div>
            </div>


            <div className='flex flex-row gap-6 pt-6'>
                <Quote quotes={quotes} />
            </div>
        </div>

    )
}

export default WelcomeComponent

const StatBadge = ({ title, value, desc, icon }) => {

    return (
        <div className="flex flex-col shadow-2xl shadow-black backdrop-opacity-90 bg-white/50 backdrop-blur-md p-5 rounded-lg w-52">
            <div className="text-3xl font-bold text-primary">{title}</div>
            <div className="text-5xl font-bold text-primary text-center flex flex-row">{icon}{value}</div>
            <div className="text-base font-semibold text-purple-700">{desc}</div>
        </div>
    )
}

const getRandomQuote = (quotes, numQoutes) => {
    var shuffled = _.shuffle(quotes)
    return shuffled.slice(0, numQoutes)
}

const Quote = ({ quotes }) => {
    const [quote, setQuote] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    useEffect(() => {
        setQuote(getRandomQuote(quotes, 3))
        setIsLoading(false)
    }, [])

    return (
        <div className="text-center text-white text-xl shadow-2xl shadow-black backdrop-opacity-90 bg-white/50 backdrop-blur-md p-5 rounded-lg">
            <div className='text-4xl font-bold'>What Satisfied Users (not Chat-GPT) Say About Iron Delirium</div>
            {isLoading && <span className="loading loading-spinner text-primary py-8"></span>}
            {!isLoading && quote.map((q, i) => (
                <div className='text-primary text-xl font-bold p-3 italic' key={i}>{q}</div>
            ))}
        </div>
    )
}
