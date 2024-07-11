import { useAppDispatch, useAppSelector } from '@/app/hooks/useActions'
import { setEn, setRu } from '@/app/store/langSlice'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/Select/Select'

interface ISelectLang {
  classNameTrigger?: string
  classNameContent?: string
}

export default function SelectLang({
  classNameTrigger,
  classNameContent,
}: ISelectLang) {
  const lang = useAppSelector((state) => state.lang.value)
  const dispatch = useAppDispatch()
  function langChangeHandler(value: string) {
    if (value == 'en') {
      dispatch(setEn())
    } else {
      dispatch(setRu())
    }
  }

  return (
    <Select onValueChange={(value) => langChangeHandler(value)}>
      <SelectTrigger className={classNameTrigger}>
        <SelectValue placeholder={lang.toUpperCase()} />
      </SelectTrigger>
      <SelectContent className={classNameContent}>
        <SelectGroup>
          <SelectItem value="en">EN</SelectItem>
          <SelectItem value="ru">RU</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
