import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import type { Repo } from '@/stores/Types'

export const useRepoStore = defineStore('repositories', () => {
  //   'vagrant' : 2 ,
  //   'WordPress' : 5 ,
  //   'tensorflow' : 15 ,
  //   'axios' : 1 ,
  //   'mac-setup' : 1 ,
  //   'linux' : 119 ,
  //   'awesome-for-beginners' : 1 ,
  //   'async-listener' : 1 ,
  //   'jekyll' : 2 ,
  // rest of the repos are 1
  const repos: Ref<Repo[]> = ref([
    {
      url: 'https://github.com/tensorflow/tensorflow',
      title: 'TensorFlow',
      description: 'A comprehensive machine learning library by Google.',
      size: 'Large',
      branchingStrategy: 'Feature Branch Workflow',
      notes:
        'This repo provides a great example of a large, complex open-source project with a very active community.',
      numberOfChunks: 16
    },
    {
      url: 'https://github.com/torvalds/linux',
      title: 'Linux',
      description: 'The Linux kernel by Linus Torvalds.',
      size: 'Large',
      branchingStrategy: 'Unique',
      notes:
        'This repo provides an excellent perspective on how an extensive and long-standing project operates.',
      numberOfChunks: 121
    },
    {
      url: 'https://github.com/WordPress/WordPress',
      title: 'WordPress',
      description: 'Web software you can use to create a beautiful website or blog.',
      size: 'Large',
      branchingStrategy: 'Gitflow Workflow',
      notes:
        'WordPress, one of the most widely used CMS platforms, follows the Gitflow workflow. The repo offers a look at a mature, widely-used open-source project.',
      numberOfChunks: 6
    },
    {
      url: 'https://github.com/jekyll/jekyll',
      title: 'Jekyll',
      description:
        'A simple, blog-aware, static site generator for personal, project, or organization sites.',
      size: 'Small',
      branchingStrategy: 'GitHub Flow',
      notes:
        "Jekyll's repository is a good example of a small to medium-sized project following the GitHub Flow branching strategy.",
      numberOfChunks: 2
    },
    {
      url: 'https://github.com/pjreddie/darknet',
      title: 'Darknet',
      description: 'An open-source neural network framework written in C and CUDA.',
      size: 'Small',
      branchingStrategy: 'Feature Branch Workflow',
      notes:
        "Darknet's repository showcases a small project with significant impact in the field of AI.",
      numberOfChunks: 1
    },
    {
      url: 'https://github.com/cowsay-org/cowsay',
      title: 'Cowsay',
      description: 'A program that generates ASCII pictures of a cow with a message.',
      size: 'Tiny',
      branchingStrategy: 'Long-Running Branches Workflow',
      notes:
        'Cowsay is an iconic Unix program with an interesting commit history for its single purpose.',
      numberOfChunks: 1
    },
    {
      url: 'https://github.com/expressjs/express',
      title: 'Express.js',
      description: 'Fast, unopinionated, minimalist web framework for node.',
      size: 'Medium',
      branchingStrategy: 'GitHub Flow',
      notes:
        'One of the most popular Node.js frameworks. Great for exploring JavaScript backend patterns.',
      numberOfChunks: 1
    },
    {
      url: 'https://github.com/typicode/json-server',
      title: 'json-server',
      description: 'Get a full fake REST API with zero coding.',
      size: 'Medium',
      branchingStrategy: '-',
      notes:
        'An interesting tool that simplifies frontend development by providing a quick backend for prototyping.',
      numberOfChunks: 1
    },
    {
      url: 'https://github.com/koajs/koa',
      title: 'Koa.js',
      description: 'Expressive middleware for node.js using ES2017 async functions.',
      size: 'Medium',
      branchingStrategy: 'GitHub Flow',
      notes:
        'An evolution of Express.js that introduces new patterns and utilities. Created by the original Express.js team.',
      numberOfChunks: 1
    },
    {
      url: 'https://github.com/Microsoft/vscode-go',
      title: 'VS Code Go',
      description: 'An extension for VS Code which provides support for the Go language.',
      size: 'Medium',
      branchingStrategy: '-',
      notes:
        "One of the key components of the popular VS Code editor, demonstrating Microsoft's open source approach.",
      numberOfChunks: 1
    },
    {
      url: 'https://github.com/axios/axios',
      title: 'Axios',
      description: 'Promise based HTTP client for the browser and node.js.',
      size: 'Medium',
      branchingStrategy: '-',
      notes:
        'One of the most popular libraries for making HTTP requests in JavaScript. Great for exploring asynchronous JavaScript.',
      numberOfChunks: 1
    },
    {
      url: 'https://github.com/hashicorp/vagrant',
      title: 'Vagrant',
      description: 'Tool for building and distributing development environments.',
      size: 'Medium',
      branchingStrategy: 'GitHub Flow',
      notes:
        'A widely used tool in the software industry, great for understanding environment management in development.',
      numberOfChunks: 2
    },
    {
      url: 'https://github.com/Leaflet/Leaflet',
      title: 'Leaflet',
      description: 'JavaScript library for mobile-friendly interactive maps.',
      size: 'Medium',
      branchingStrategy: '-',
      notes:
        'A leading open-source JavaScript library for mobile-friendly interactive maps, known for its simplicity, performance, and usability.',
      numberOfChunks: 1
    },
    {
      url: 'https://github.com/piuccio/cowsay',
      title: 'Cowsay',
      description: 'Program that generates ASCII pictures of a cow with a message.',
      size: 'Tiny',
      branchingStrategy: '-',
      notes: 'A fun, legendary command-line program. Excellent for a light-hearted break.',
      numberOfChunks: 1
    },
    {
      url: 'https://github.com/othiym23/async-listener',
      title: 'Async-listener',
      description: 'Continuation-local storage for async callbacks in Node.js.',
      size: 'Tiny',
      branchingStrategy: '-',
      notes: 'Interesting due to its impact on Node.js asynchronous programming.',
      numberOfChunks: 1
    },
    {
      url: 'https://github.com/github/personal-website',
      title: 'Personal Website',
      description: 'Code that powers the GitHub personal websites.',
      size: 'Small',
      branchingStrategy: 'GitHub Flow',
      notes: "A good example of GitHub's open source strategy and community engagement.",
      numberOfChunks: 1
    },
    {
      url: 'https://github.com/airbnb/javascript',
      title: 'Airbnb JavaScript Style Guide',
      description: 'A mostly reasonable approach to JavaScript.',
      size: 'Small',
      branchingStrategy: '-',
      notes: "An extremely popular JavaScript style guide that's influenced JS development.",
      numberOfChunks: 1
    },
    {
      url: 'https://github.com/MunGell/awesome-for-beginners',
      title: 'Awesome for Beginners',
      description: 'A list of awesome beginners-friendly projects.',
      size: 'Small',
      branchingStrategy: '-',
      notes: 'A community-driven project aimed to help beginners start with open-source.',
      numberOfChunks: 1
    },
    {
      url: 'https://github.com/yaronn/GifW00t',
      title: 'GifW00t',
      description: 'A pure-javascript web recorder.',
      size: 'Tiny',
      branchingStrategy: '-',
      notes: 'An interesting tool developed as a pure JS solution.',
      numberOfChunks: 1
    },
    {
      url: 'https://github.com/ptb/mac-setup',
      title: 'Mac Setup',
      description: 'A guide for setting up a new Mac for development.',
      size: 'Small',
      branchingStrategy: 'GitHub Flow',
      notes: 'Useful guide showcasing community best practices.',
      numberOfChunks: 1
    },
    {
      url: 'https://github.com/zricethezav/gitleaks',
      title: 'Gitleaks',
      description: 'Audit git repos for secrets.',
      size: 'Small',
      branchingStrategy: 'GitHub Flow',
      notes:
        'A security tool widely used in the industry to prevent committing sensitive information.',
      numberOfChunks: 1
    },
    {
      url: 'https://github.com/schollz/howmanypeoplearearound',
      title: 'How Many People Are Around',
      description: 'Tally the number of people around you by monitoring wifi signals.',
      size: 'Tiny',
      branchingStrategy: '-',
      notes: 'A unique tool that utilizes wifi signals in a fun way.',
      numberOfChunks: 1
    },
    {
      url: 'https://github.com/BurntSushi/ripgrep',
      title: 'ripgrep',
      description: 'Combines the usability of The Silver Searcher with the raw speed of grep.',
      size: 'Small',
      branchingStrategy: 'Feature Branch Workflow',
      notes: 'An efficient and fast searching tool, widely used and appreciated.',
      numberOfChunks: 1
    }
  ])

  const getNumberOfChunks = (repoName: string) => {
    const repo = repos.value.find((repo) => repo.url.includes(repoName))
    return repo ? repo.numberOfChunks : 1
  }

  return {
    repos: repos,
    getNumberOfChunks
  }
})
