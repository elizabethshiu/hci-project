const citationData = [
  {
    key: 1,
    parentKey: "0publications",
    title: 'I.—COMPUTING MACHINERY AND INTELLIGENCE',
    authors: [{ firstName: 'Alan', lastName: 'Turing' }],
    publishDate: '1950-03-05',
    condensedAuthors: 'Turing',
    description: 'Computing Machinery and Intelligence" is a seminal paper written by Alan Turing on the topic of artificial intelligence. The paper, published in 1950 in Mind, was the first to introduce his concept of what is now known as the Turing test to the general public.',
    notes: ['Note 1 for I.—COMPUTING MACHINERY AND INTELLIGENCE', 'Note 2 for I.—COMPUTING MACHINERY AND INTELLIGENCE'],
    itemType: 'Journal Article',
    tags: ['background', 'discussion'],
    url: 'https://academic.oup.com/mind/article/LIX/236/433/986238',
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
    parentKey: "0publications",
    title: 'Artificial Intelligence: A Modern Approach',
    authors: [{ firstName: 'Peter', lastName: 'Stuart' }, { firstName: 'Peter', lastName: 'Norvig' }],
    publishDate: '2020-10-16',
    condensedAuthors: 'Stuart & Norvig',
    description: 'PDF here (?)',
    notes: ['Note 1 for Artificial Intelligence: A Modern Approach', 'Note 2 for Artificial Intelligence: A Modern Approach'],
    itemType: 'Book',
    tags: ['background'],
    url: '',
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
    parentKey: "0publications",
    title: 'Foundations of Machine Learning',
    authors: [{ firstName: 'Mehryar', lastName: 'Mohri' }, { firstName: 'Afshin', lastName: 'Rostamizadeh' }, { firstName: 'Ameet', lastName: 'Talwalkar' }],
    publishDate: '2001-07-09',
    condensedAuthors: 'Mohri et al.',
    description: 'PDF here (?)',
    notes: ['Note 1 for Foundations of Machine Learning'],
    itemType: 'Book',
    tags: [],
    url: '',
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
    parentKey: "0publications",
    title: 'A New High In Deal Activity To Artificial Intelligence Startups In Q4\'15',
    authors: [{ firstName: '', lastName: '' }],
    publishDate: '',
    condensedAuthors: 'N/A',
    description: 'N/A',
    notes: ['Note 1 for A New High In Deal Activity To Artificial Intelligence Startups In Q4\'15'],
    itemType: 'Web Page',
    tags: ['background', 'discussion'],
    url: '',
    recommendations: [] // No recommendations for this item
    
  },
  {
    key: 5,
    parentKey: "0publications",
    title: 'ImageNet Classification with Deep Convolutional Neural Networks',
    authors: [{ firstName: 'Alex', lastName: 'Krizhevsky' }, { firstName: 'Ilya', lastName: 'Sutskever' }, { firstName: 'Geoffrey', lastName: 'Hinton' }],
    publishDate: '2022-03-05',
    condensedAuthors: 'Krizhevsky et al.',
    description: 'PDF here (?)',
    notes: ['Note 1 for ImageNet Classification with Deep Convolutional Neural Networks'],
    itemType: 'Journal Article',
    tags :[],
    url: '',
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