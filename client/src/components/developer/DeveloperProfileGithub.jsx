import React from 'react'
import PropTypes from 'prop-types'

const DeveloperProfileGithub = ({ repos }) => {

    const repositories = repos.map((repo, index) => {

        const { name, html_url, description, stargazers_count, watchers_count, forks_count } = repo;

        return (
            <div className="repo bg-white p-1 my-1" key={index}>
                <div>
                    <h4><a href={html_url} target="_blank"
                        rel="noopener noreferrer">{name}</a></h4>
                    <p>
                        {description}
                    </p>
                </div>
                <div>
                    <ul>
                        <li className="badge badge-primary">Stars: {stargazers_count}</li>
                        <li className="badge badge-dark">Watchers: {watchers_count}</li>
                        <li className="badge badge-light">Forks: {forks_count}</li>
                    </ul>
                </div>
            </div>
        );
    });

    return (
        <div className="profile-github">
            <h2 className="text-primary my-1">
                <i className="fab fa-github"></i> Github Repos
            </h2>

            {repositories.length > 0 ? repositories : 'No Repositories'}

        </div>
    )
}

DeveloperProfileGithub.propTypes = {
    repos: PropTypes.array.isRequired,
}

export default DeveloperProfileGithub
