import React, { useCallback, useEffect, useState } from 'react'
import { useRouteMatch, Link } from 'react-router-dom'
import { FiChevronLeft, FiChevronRight } from 'react-icons/all'
import ContentLoader from 'react-content-loader'

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

function Repository(): React.JSX.Element {
  const { params } = useRouteMatch<RepositoryParams>()

  const [repository, setRepository] = useState<RepositoryProps | null>(null)
  const [issues, setIssues] = useState<Issue[]>([])

  const getRepository = useCallback(async (): Promise<void> => {
    const { data } = await api.get(`repos/${params.repository}`)
    setRepository(data)
  }, [params.repository])

  const getIssues = useCallback(async (): Promise<void> => {
    const { data } = await api.get(`repos/${params.repository}/issues`)
    setIssues(data)
  }, [params.repository])

  function humanizeNumber(number: number): string {
    return number.toLocaleString('en-US')
  }

  useEffect(() => {
    getRepository()
    getIssues()
  }, [getRepository, getIssues])

  return (
    <>
      <Header>
        <img src={logoImg} alt="Github Explorer" />

        <Link to="/">
          <FiChevronLeft size={16} /> Back
        </Link>
      </Header>

      <RepositoryInfo>
        {repository
          ? (
            <>
              <header>
                <img src={repository.owner.avatar_url} alt={repository.owner.login} />

                <div>
                  <strong>{repository.full_name}</strong>
                  <p>{repository.description}</p>
                </div>
              </header>

              <ul>
                <li>
                  <strong>{humanizeNumber(repository.stargazers_count)}</strong>
                  <span>Stars</span>
                </li>
                <li>
                  <strong>{humanizeNumber(repository.forks_count)}</strong>
                  <span>Forks</span>
                </li>
                <li>
                  <strong>{humanizeNumber(repository.open_issues_count)}</strong>
                  <span>Open issues</span>
                </li>
              </ul>
            </>
          )
          : (
            <ContentLoader
              speed={2}
              width={400}
              height={220}
              viewBox="0 0 400 220"
              backgroundColor="#A8A8B3"
              foregroundColor="#ECEBEB"
            >
              <rect x="131" y="14" rx="3" ry="3" width="169" height="12" />
              <rect x="131" y="44" rx="3" ry="3" width="297" height="27" />
              <circle cx="62" cy="54" r="50" />
              <rect x="26" y="144" rx="0" ry="0" width="48" height="28" />
              <rect x="26" y="184" rx="0" ry="0" width="68" height="8" />
              <rect x="117" y="143" rx="0" ry="0" width="48" height="28" />
              <rect x="117" y="183" rx="0" ry="0" width="68" height="8" />
              <rect x="206" y="143" rx="0" ry="0" width="48" height="28" />
              <rect x="206" y="183" rx="0" ry="0" width="68" height="8" />
            </ContentLoader>
          )}
      </RepositoryInfo>

      <Issues>
        {issues.length === 0 && (
          <ContentLoader
            speed={2}
            width={500}
            height={350}
            viewBox="0 0 500 350"
            backgroundColor="#A8A8B3"
            foregroundColor="#ECEBEB"
          >
            <rect x="10" y="9" rx="0" ry="0" width="100%" height="68" />
            <rect x="10" y="96" rx="0" ry="0" width="100%" height="68" />
            <rect x="10" y="183" rx="0" ry="0" width="100%" height="68" />
            <rect x="10" y="270" rx="0" ry="0" width="100%" height="68" />
          </ContentLoader>
        )}

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
