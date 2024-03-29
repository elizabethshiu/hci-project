const citationData = [
  {
    key: 1,
    title: '',
    authors: [{ firstName: 'Alan', lastName: 'Turing' }],
    condensedAuthors: 'Turing',
    description: 'PDF here (?)',
    notes: ['Note 1 for I.—COMPUTING MACHINERY AND INTELLIGENCE', 'Note 2 for I.—COMPUTING MACHINERY AND INTELLIGENCE'],
    itemType: 'Journal Article',
    tags: ['background', 'discussion'],
    recommendations: [
      {
        title: 'Machine Learning: A Probabilistic Perspective',
        author: 'Kevin P. Murphy',
        link: `https://www.google.com/search?q=Machine+Learning:+A+Probabilistic+Perspective`
      },
      {
        title: 'Deep Learning for Natural Language Processing',
        author: 'Yoshua Bengio, Ian Goodfellow, Aaron Courville',
        link: `https://www.google.com/search?q=Deep+Learning+for+Natural+Language+Processing`
      },
      {
        title: 'Pattern Recognition and Machine Learning',
        author: 'Christopher M. Bishop',
        link: `https://www.google.com/search?q=Pattern+Recognition+and+Machine+Learning`
      }
    ],
    
  },
  {
    key: 2,
    title: 'Artificial Intelligence: A Modern Approach',
    authors: [{ firstName: 'Peter', lastName: 'Stuart' }, { firstName: 'Peter', lastName: 'Norvig' }],
    condensedAuthors: 'Stuart & Norvig',
    description: 'PDF here (?)',
    notes: ['Note 1 for Artificial Intelligence: A Modern Approach', 'Note 2 for Artificial Intelligence: A Modern Approach'],
    itemType: 'Book',
    tags: ['background'],
    recommendations: [
      {
        title: 'Artificial Intelligence: Foundations of Computational Agents',
        author: 'David L. Poole, Alan K. Mackworth',
        link: `https://www.google.com/search?q=Artificial+Intelligence:+Foundations+of+Computational+Agents`
      },
      {
        title: 'Introduction to Autonomous Robots',
        author: 'Nikolaus Correll, Bradley Hayes',
        link: `https://www.google.com/search?q=Introduction+to+Autonomous+Robots`
      }
    ]    
  },
  {
    key: 3,
    title: 'Foundations of Machine Learning',
    authors: [{ firstName: 'Mehryar', lastName: 'Mohri' }, { firstName: 'Afshin', lastName: 'Rostamizadeh' }, { firstName: 'Ameet', lastName: 'Talwalkar' }],
    condensedAuthors: 'Mohri et al.',
    description: 'PDF here (?)',
    notes: ['Note 1 for Foundations of Machine Learning'],
    itemType: 'Book',
    tags: [],
    recommendations: [
      {
        title: 'Understanding Machine Learning: From Theory to Algorithms',
        author: 'Shai Shalev-Shwartz, Shai Ben-David',
        link: `https://www.google.com/search?q=Understanding+Machine+Learning:+From+Theory+to+Algorithms`
      },
      {
        title: 'Machine Learning Yearning',
        author: 'Andrew Ng',
        link: `https://www.google.com/search?q=Machine+Learning+Yearning`
      }
    ]
  },
  {
    key: 4,
    title: 'A New High In Deal Activity To Artificial Intelligence Startups In Q4\'15',
    authors: [],
    condensedAuthors: 'N/A',
    description: 'N/A',
    notes: ['Note 1 for A New High In Deal Activity To Artificial Intelligence Startups In Q4\'15'],
    itemType: 'Web Page',
    tags: ['background', 'discussion'],
    recommendations: [] // No recommendations for this item
    
  },
  {
    key: 5,
    title: 'ImageNet Classification with Deep Convolutional Neural Networks',
    authors: [{ firstName: 'Alex', lastName: 'Krizhevsky' }, { firstName: 'Ilya', lastName: 'Sutskever' }, { firstName: 'Geoffrey', lastName: 'Hinton' }],
    condensedAuthors: 'Krizhevsky et al.',
    description: 'PDF here (?)',
    notes: ['Note 1 for ImageNet Classification with Deep Convolutional Neural Networks'],
    itemType: 'Journal Article',
    tags :[],
    recommendations: [
      {
        title: 'Neural Networks and Deep Learning',
        author: 'Michael Nielsen',
        link: `https://www.google.com/search?q=Neural+Networks+and+Deep+Learning`
      },
      {
        title: 'Deep Learning',
        author: 'Ian Goodfellow, Yoshua Bengio, Aaron Courville',
        link: `https://www.google.com/search?q=Deep+Learning`
      }
    ]
    
  }
]
export default citationData