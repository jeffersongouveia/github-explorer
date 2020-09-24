import React, { useState, useEffect, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { FiChevronRight } from 'react-icons/fi'
import { PropagateLoader } from 'react-spinners'
import InfiniteScroll from 'react-infinite-scroll-component'

import {
  Title, Form, Error, Repositories, Search,
} from './styles'
import api from '../../services/api'

import logoImg from '../../assets/logo.svg'

interface Repository {
  full_name: string
  description: string
  owner: {
    login: string
    avatar_url: string
  }
}

interface Response {
  total_count: number
  items: Repository[]
}

const Dashboard: React.FC = () => {
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storageRepositories = sessionStorage.getItem('repositories') || ''
    return JSON.parse(storageRepositories)
  })

  const [searchTerm, setSearchTerm] = useState(() => {
    const storageSearchTerm = sessionStorage.getItem('search_term') || ''
    return JSON.parse(storageSearchTerm)
  })

  const [isSearching, setIsSearching] = useState(false)
  const [repoCount, setRepoCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [inputError, setInputError] = useState('')

  useEffect(() => {
    sessionStorage.setItem('repositories', JSON.stringify(repositories))
  }, [repositories])

  useEffect(() => {
    sessionStorage.setItem('search_term', JSON.stringify(searchTerm))
  }, [searchTerm])

  async function handleFindRepositories(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()

    if (!searchTerm) {
      setInputError('Desculpe, mas preciso de algum termo para pesquisar 🙂')
      return
    }

    setInputError('')
    setCurrentPage(1)
    setIsSearching(true)
    setRepositories([])

    const { data } = await api.get<Response>(`/search/repositories?q=${searchTerm}&per_page=10&sort=stargazers_count`)

    setHasMore(data.items.length > 0)
    setIsSearching(false)
    setRepoCount(data.total_count)
    setRepositories([...data.items])
  }

  async function handleLoadNextPage(): Promise<void> {
    setIsSearching(true)

    const { data } = await api.get<Response>(`/search/repositories?q=${searchTerm}&page=${currentPage + 1}&per_page=10&sort=stargazers_count`)

    setIsSearching(false)
    setCurrentPage(currentPage + 1)
    setHasMore(data.items.length > 0)
    setRepositories([...repositories, ...data.items])
  }

  return (
    <>
      <img src={logoImg} alt="github Explorer" />

      <Title>
        Explore repositórios no Github
      </Title>

      <Form onSubmit={handleFindRepositories}>
        <Search hasError={!!inputError}>
          <input
            value={searchTerm}
            placeholder="Digite o nome do repositório"
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <button type="submit">
            Pesquisar
          </button>
        </Search>

        {inputError && <Error>{inputError}</Error>}
      </Form>

      <Repositories>
        <InfiniteScroll
          next={handleLoadNextPage}
          dataLength={repoCount}
          hasMore={hasMore}
          loader={(
            <PropagateLoader
              loading={isSearching}
              color="#04D361"
              size={15}
              css="display: flex; justify-content: center; margin: 20px auto;"
            />
          )}
          endMessage={(
            <p style={{ textAlign: 'center' }}>
              <b>That's all folks</b>
            </p>
          )}
        >
          {repositories.map((repository) => (
            <Link key={repository.full_name} to={`/repository/${repository.full_name}`}>
              <img src={repository.owner.avatar_url} alt={repository.owner.login} />

              <div>
                <strong>{repository.full_name}</strong>
                <p>{repository.description}</p>
              </div>

              <FiChevronRight size={20} />
            </Link>
          ))}
        </InfiniteScroll>
      </Repositories>
    </>
  )
}

export default Dashboard
