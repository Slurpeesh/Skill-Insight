import { useAppDispatch, useAppSelector } from '@/app/hooks/useActions'
import getText from '@/app/locale'
import { update } from '@/app/store/slices/countriesSlice'
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/entities/ToggleGroup/ToggleGroup'
import AzerbaijanFlagToggle from '@/features/AzerbaijanFlagToggle/AzerbaijanFlagToggle'
import BelarusFlagToggle from '@/features/BelarusFlagToggle/BelarusFlagToggle'
import GeorgiaFlagToggle from '@/features/GeorgiaFlagToggle/GeorgiaFlagToggle'
import KazakhstanFlagToggle from '@/features/KazakhstanFlagToggle/KazakhstanFlagToggle'
import KyrgyzstanFlagToggle from '@/features/KyrgyzstanFlagToggle/KyrgyzstanFlagToggle'
import OtherRegionsToggle from '@/features/OtherRegionsToggle/OtherRegionsToggle'
import RussianFlagToggle from '@/features/RussianFlagToggle/RussianFlagToggle'
import UzbekistanFlagToggle from '@/features/UzbekistanFlagToggle/UzbekistanFlagToggle'

export default function ToggleGroupCountries() {
  const lang = useAppSelector((state) => state.lang.value)
  const countries = useAppSelector((state) => state.countries.value)
  const dispatch = useAppDispatch()
  const flags = true

  function toggleHandler(value: Array<string>) {
    dispatch(update(value))
  }

  return (
    <>
      <div className="my-2 font-semibold text-center">
        {getText(lang, 'chooseCountry')}
      </div>
      {flags && (
        <ToggleGroup
          className="flex flex-wrap gap-4 mx-24"
          type="multiple"
          value={countries}
          onValueChange={(value) => toggleHandler(value)}
        >
          <RussianFlagToggle />
          <BelarusFlagToggle />
          <KazakhstanFlagToggle />
          <GeorgiaFlagToggle />
          <KyrgyzstanFlagToggle />
          <UzbekistanFlagToggle />
          <AzerbaijanFlagToggle />
          <OtherRegionsToggle />
        </ToggleGroup>
      )}
      {!flags && (
        <ToggleGroup
          className="flex flex-wrap"
          type="multiple"
          value={countries}
          onValueChange={(value) => toggleHandler(value)}
        >
          <ToggleGroupItem value="113">Россия</ToggleGroupItem>
          <ToggleGroupItem value="16">Беларусь</ToggleGroupItem>
          <ToggleGroupItem value="40">Казахстан</ToggleGroupItem>
          <ToggleGroupItem value="28">Грузия</ToggleGroupItem>
          <ToggleGroupItem value="48">Кыргызстан</ToggleGroupItem>
          <ToggleGroupItem value="97">Узбекистан</ToggleGroupItem>
          <ToggleGroupItem value="9">Азербайджан</ToggleGroupItem>
          <ToggleGroupItem value="1001">Другие регионы</ToggleGroupItem>
        </ToggleGroup>
      )}
    </>
  )
}
