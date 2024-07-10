import { IpcMainInvokeEvent } from 'electron'

export function getVacancies(
  searchRequest: IpcMainInvokeEvent,
  area: number,
  page: number,
  mail: string,
  accessToken: string
) {
  const params = new URLSearchParams({
    text: `${searchRequest}`,
    area: `${area}`,
    per_page: '100',
    page: `${page}`,
  })
  const url = `https://api.hh.ru/vacancies?${params}`
  const headers = {
    'User-Agent': `Skill Insight/1.0 (${mail})`,
    Authorization: `Bearer ${accessToken}`,
  }

  const response = fetch(url, { headers: headers })
    .then((response) => response.json())
    .catch((err) => console.log(err))

  return response
}

export function getVacancySkills(
  vacancyId: number,
  mail: string,
  accessToken: string
) {
  const url = `https://api.hh.ru/vacancies/${vacancyId}`
  const headers = {
    'User-Agent': `Skill Insight/1.0 (${mail})`,
    Authorization: `Bearer ${accessToken}`,
  }

  const response = fetch(url, { headers: headers })
    .then((response) => response.json())
    .then((data) => {
      if (data.errors) {
        return data
      }
      const skills: Array<string> = []
      for (const skill of data.key_skills) {
        skills.push(skill.name)
      }
      return skills
    })
    .catch((err) => console.log(err))

  return response
}
