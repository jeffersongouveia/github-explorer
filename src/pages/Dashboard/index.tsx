import React, { useState, FormEvent } from 'react'
import { FiChevronRight } from 'react-icons/fi'

import logoImg from '../../assets/logo.svg'

import { Title, Form, Repositories } from './styles'
import api from '../../services/api'

interface Repository {
  full_name: string
  description: string
  owner: {
    login: string
    avatar_url: string
  }
}

const Dashboard: React.FC = () => {
  const [repo, setRepo] = useState('')
  const [repositories, setRepositories] = useState<Repository[]>([])

  async function handleFindRepositories(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()

    const { data } = await api.get(`/search/repositories?q=${repo}&per_page=10&sort=stargazers_count`)
    setRepositories([...data.items])
  }

  return (
    <>
      <img src={logoImg} alt="github Explorer" />

      <Title>
        Explore repositórios no Github
      </Title>

      <Form onSubmit={handleFindRepositories}>
        <input
          value={repo}
          placeholder="Digite o nome do repositório"
          onChange={(e) => setRepo(e.target.value)}
        />

        <button type="submit">
          Pesquisar
        </button>
      </Form>

      <Repositories>
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
      </Repositories>
    </>
  )
}

export default Dashboard
