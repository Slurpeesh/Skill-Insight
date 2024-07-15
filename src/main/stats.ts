export function getVacancies(
  searchRequest: string,
  area: Array<string>,
  page: number,
  locale: string,
  mail: string,
  accessToken: string,
  signal: AbortSignal
) {
  const params = new URLSearchParams({
    text: searchRequest,
    per_page: '100',
    page: page.toString(),
    locale,
  })
  for (const item of area) {
    params.append('area', item)
  }

  const url = `https://api.hh.ru/vacancies?${params}`
  const headers = {
    'User-Agent': `Skill Insight/1.0 (${mail})`,
    Authorization: `Bearer ${accessToken}`,
  }

  const response = fetch(url, { headers: headers, signal })
    .then((response) => response.json())
    .catch((err) => {
      if (err.name === 'AbortError') {
        // console.log(err)
        return { terminated: 1 }
      } else {
        console.log(err)
      }
    })

  return response
}

export function getVacancySkills(
  vacancyId: number,
  locale: string,
  mail: string,
  accessToken: string,
  signal: AbortSignal
) {
  const params = new URLSearchParams({
    locale: `${locale}`,
  })
  const url = `https://api.hh.ru/vacancies/${vacancyId}?${params}`
  const headers = {
    'User-Agent': `Skill Insight/1.0 (${mail})`,
    Authorization: `Bearer ${accessToken}`,
  }

  const response = fetch(url, { headers: headers, signal })
    .then((response) => response.json())
    .then((data) => {
      if (data.errors) {
        return data
      }
      // console.log(data.area.name)
      const skills: Array<string> = []
      for (const skill of data.key_skills) {
        skills.push(skill.name)
      }
      return { skills, area: data.area.name }
    })
    .catch((err) => {
      if (err.name === 'AbortError') {
        // console.log(err)
        return { terminated: 1 }
      } else {
        console.log(err)
      }
    })

  return response
}
