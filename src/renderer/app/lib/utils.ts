import CountryCodes from '@/app/lib/countryCodes'
import jobs from '@/app/lib/jobNames'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type CountryCodeKeys = keyof typeof CountryCodes
type CountryCodeValues = `${CountryCodes}`

const reverseCountryCodes: Record<CountryCodeValues, CountryCodeKeys> = {
  '113': 'russia',
  '16': 'belarus',
  '40': 'kazakhstan',
  '28': 'georgia',
  '48': 'kyrgyzstan',
  '97': 'uzbekistan',
  '9': 'azerbaijan',
  '1001': 'otherRegions',
}

export function decodeCountry(id: CountryCodeValues): CountryCodeKeys {
  return reverseCountryCodes[id]
}

type Jobs = (typeof jobs)[number]

export function randomJob(): Jobs {
  return jobs[Math.floor(Math.random() * jobs.length)]
}
