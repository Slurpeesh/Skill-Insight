import * as en from '@/app/locale/en.json'
import * as ru from '@/app/locale/ru.json'

type LangKeys = keyof typeof en

export default function getText(lang: string, context: LangKeys) {
  return lang == 'en' ? en[context] : ru[context]
}
