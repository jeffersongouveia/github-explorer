import React, { useEffect, useState } from 'react'
import { useRouteMatch, Link } from 'react-router-dom'
import { FiChevronLeft, FiChevronRight } from 'react-icons/all'

import { Header, RepositoryInfo, Issues } from './styles'
import api from '../../services/api'

import logoImg from '../../assets/logo.svg'

interface RepositoryParams {
  repository: string
}

interface RepositoryProps {
  full_name: string
  description: string
  stargazers_count: number
  forks_count: number
  open_issues_count: number

  owner: {
    login: string
    avatar_url: string
  }
}

interface Issue {
  id: number
  title: string
  html_url: string

  user :{
    login: string
    avatar_url: string
  }
}

const Repository: React.FC = () => {
  const { params } = useRouteMatch<RepositoryParams>()

  const [repository, setRepository] = useState<RepositoryProps | null>(null)
  const [issues, setIssues] = useState<Issue[]>([])

  async function getRepository(): Promise<void> {
    const { data } = await api.get(`repos/${params.repository}`)
    setRepository(data)
  }

  async function getIssues(): Promise<void> {
    const { data } = await api.get(`repos/${params.repository}/issues`)
    setIssues(data)
  }

  useEffect(() => {
    getRepository()
    getIssues()
  }, [params.repository])

  return (
    <>
      <Header>
        <img src={logoImg} alt="Github Explorer" />

        <Link to="/">
          <FiChevronLeft size={16} /> Voltar
        </Link>
      </Header>

      {repository && (
        <RepositoryInfo>
          <header>
            <img src={repository.owner.avatar_url} alt={repository.owner.login} />

            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
          </header>

          <ul>
            <li>
              <strong>{repository.stargazers_count}</strong>
              <span>Estrelas</span>
            </li>
            <li>
              <strong>{repository.forks_count}</strong>
              <span>Forks</span>
            </li>
            <li>
              <strong>{repository.open_issues_count}</strong>
              <span>Issues abertas</span>
            </li>
          </ul>
        </RepositoryInfo>
      )}

      <Issues>
        {issues.map((issue) => (
          <a key={issue.id} href={issue.html_url} target="_blank" rel="noopener noreferrer">
            <img src={issue.user.avatar_url} alt={issue.user.login} />

            <div>
              <strong>{issue.title}</strong>
              <p>{issue.user.login}</p>
            </div>

            <FiChevronRight size={20} />
          </a>
        ))}
      </Issues>
    </>
  )
}

export default Repository
