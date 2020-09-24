import React, { useState, FormEvent } from 'react'
import { FiChevronRight } from 'react-icons/fi'
import { PropagateLoader } from 'react-spinners'
import InfiniteScroll from 'react-infinite-scroll-component'

import logoImg from '../../assets/logo.svg'

import {
  Title, Form, Error, Repositories, Search,
} from './styles'
import api from '../../services/api'

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
  const [repo, setRepo] = useState('')
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [repoCount, setRepoCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [inputError, setInputError] = useState('')

  async function handleFindRepositories(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()

    if (!repo) {
      setInputError('Desculpe, mas preciso de algum termo para pesquisar 🙂')
      return
    }

    setInputError('')
    setCurrentPage(1)
    setIsSearching(true)
    setRepositories([])

    const { data } = await api.get<Response>(`/search/repositories?q=${repo}&per_page=10&sort=stargazers_count`)

    setHasMore(data.items.length > 0)
    setIsSearching(false)
    setRepositories([...data.items])
    setRepoCount(data.total_count)
  }

  async function handleLoadNextPage(): Promise<void> {
    setIsSearching(true)

    const { data } = await api.get<Response>(`/search/repositories?q=${repo}&page=${currentPage + 1}&per_page=10&sort=stargazers_count`)

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
            value={repo}
            placeholder="Digite o nome do repositório"
            onChange={(e) => setRepo(e.target.value)}
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
            <a key={repository.full_name} href="/">
              <img src={repository.owner.avatar_url} alt={repository.owner.login} />

              <div>
                <strong>{repository.full_name}</strong>
                <p>{repository.description}</p>
              </div>

              <FiChevronRight size={20} />
            </a>
          ))}
        </InfiniteScroll>
      </Repositories>
    </>
  )
}

export default Dashboard
