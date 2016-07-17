# LoadMaster
---

## Description
Load Master is the load distributing component of the Load Effect application. This server receives requests from the Load Effect web server and spins up docker instances based on the request specifications. The Load Master features a custom-built job queue which will distribute work through the /api/requestJob end point, job de-packaging capabilities, etc. Worker servers interact with the Master server by asking for additional additional packets of work. If no more work is available, masters will shut down workers.

### Features
  - Job Queue
  - Work splitting algorithm
  - Create and remove Docker containers

### Master Server Architecture

![image](https://cloud.githubusercontent.com/assets/17420728/16813166/3f0f6464-48e5-11e6-90f0-0133db6e40ce.png)

## Table of Contents

1. [Usage](#usage)
1. [Getting Started](#getting-started)
    1. [Prerequisites](#prerequisites)
    1. [Installing Dependencies](#installing-dependencies)
1. [Core Team](#core-team)
1. [Contributing](#contributing)
1. [Licensing](#license)


## Getting Started

### Prerequisites

### Installing Dependencies

From within the root directory:

```sh
npm install
```

### Running The App
npm start

## Testing
npm test

Run:
```sh
npm test
```

## Core Team

  - __Scrum Master__: [Felix Feng](https://github.com/felix2feng)
  - __Product Owner__: [Tai Huynh](https://github.com/anhtaiH)
  - __Development Team Members__: [Bill Ramsey](https://github.com/billramsey), [Christian Haug](https://github.com/cshg), [Felix Feng](https://github.com/felix2feng), [Tai Huynh](https://github.com/anhtaiH)

## Contributing

1. Fork the repo.
1. Clone it to your local computer
1. Cut a namespaced feature branch from master and name it appropriately
1. Make commits and prefix each commit with the type of work you were doing
1. BEFORE PUSHING UP YOUR CHANGES, rebase upstream changes into your branch, fix any potential conflicts, and then push to your fork.
1. Submit a pull request directly to the master
1. Someone else will perform code review to keep codebase clean
1. Fix any errors or issues raised by the reviewer and push the fixes as a single new commit
1. Repeat until the pull request is merged.

See [CONTRIBUTING.md](_CONTRIBUTING.md) for contribution guidelines in detail.

## License

M.I.T
