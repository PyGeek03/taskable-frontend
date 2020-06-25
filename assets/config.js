export let team = [
  {
    name: 'John Morrison',
    role: 'developer',
    is_manager: false,
    email: 'john.morrison@taskable.com',
    birthday: '1980-07-06',
    mobile_phone: '0423444888'
  },
  {
    name: 'Anna Liu',
    role: 'SRE',
    is_manager: true,
    email: 'anna.liu@taskable.com',
    birthday: '1989-12-23',
    mobile_phone: '0433096134'
  },
  {
    name: 'Joseph Hoang',
    role: 'developer',
    is_manager: false,
    email: 'joseph.hoang@taskable.com',
    birthday: '1995-11-01',
    mobile_phone: '0432065124'
  },
  {
    name: 'Joanna Steward',
    role: 'SRE',
    is_manager: false,
    email: 'joanna.steward@taskable.com',
    birthday: '1993-05-16',
    mobile_phone: '0442745726'
  },
  {
    name: 'Jose Biden',
    role: 'developer',
    is_manager: true,
    email: 'jose.biden@taskable.com',
    birthday: '1960-01-07',
    mobile_phone: '0453565236'
  }
]

export let tasks = [
  {
    name: 'Create website theme',
    due_date: '2020-06-17',
    owner: 'John Morrison',
    category: 'Frontend',
    done: true
  },
  {
    name: 'Configure linter',
    due_date: '2020-06-14',
    owner: 'Anna Liu',
    category: 'DevOps',
    done: true
  },
  {
    name: 'Learn Bootstrap',
    due_date: '2020-06-17',
    owner: 'Joseph Hoang',
    category: 'Frontend',
    done: false
  },
  {
    name: 'Configure GCP server',
    due_date: '2020-06-20',
    owner: 'Anna Liu',
    category: 'Backend',
    done: false
  }
]

export let userName = 'Anna Liu'