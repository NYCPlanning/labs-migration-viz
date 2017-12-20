var characteristics = { // eslint-disable-line
  age: {
    displayName: 'Age',
    colors: ['#a6d1f8', '#012e60'],
    about: 'Of all characteristics, age is one of the greatest predictors of migration. NYC consistently attracts large numbers of people in their 20s, and generally sees net migration losses of people in all other age groups. This is tied to the lifecycle, whereby young single people move to the city, and some residents move out after family formation. Over the past 30 years, the net inflow among those in their 20s has increased. While net migration was still negative for most other age groups, the most recent period has seen a reduction in net outflows.',
    descriptor: 'people aged'
  },
  sex: {
    displayName: 'Sex',
    colors: ['#1B83B0', '#C17229'],
    about: 'Historically, males and females had similar migration flows into and out of the city. However, in the 2010-2014 period, the net inflow of women exceeded that of men by 44,000.',
    descriptor: 'people who reported as'
  },
  race_and_hispanic_origin: {
    displayName: 'Race and Hispanic Origin',
    colors: ['#1f4064', '#fdc010', '#cd594a', '#73c4e1', '#5e170e'],
    about: 'Each race/Hispanic group shows unique migration patterns. The fiscal crisis of the 1970s saw a large net outflow of whites, but this declined in subsequent decades, with net migration turning positive in 2010-2014. The black population has shown consistent net outflows since the 1970s, a reversal of the earlier 20th century trend that saw a surge in net inflows, especially from the south. Hispanics, too, have experienced net migration losses since the 1970s, but losses have been pared back and were close to zero in 2010-2014. (Blacks and Hispanics have continued to grow each decade thanks to natural increase.) Asians are the only major group to have positive net migration since the 1970s.',
    descriptor: 'people who reported their race as'
  },
  nativity: {
    displayName: 'Nativity',
    colors: ['#1B83B0', '#C17229'],
    about: 'Nativity of migrants reflects the significance of immigration to NYC. Through all periods where data are available, NYC saw large net gains of the foreign-born, while experiencing a net loss of native born persons. This illustrates NYC’s historic role in providing a landing spot for newcomers to the US and in turn sending persons who are native-born to the rest of the country.',
    descriptor: 'people who were'
  },
  marital_status: {
    displayName: 'Marital Status',
    colors: ['#FDC010', '#1F4064', '#88D0EA', '#CD594A'],
    about: 'Lifecycle migration is particularly evident when examining marital status, which is closely related to age. Through all periods measured, NYC attracts large numbers of people who have never been married and, in turn, sees many married people leave. 2010-14 is the first period in our data showing married people with a net migration close to zero, suggesting that the City is increasingly seen as family-friendly.',
    descriptor: 'people who reported as'
  },
  educational_attainment: {
    displayName: 'Educational Attainment',
    colors: ['#a6d1f8', '#012e60'],
    about: 'NYC’s ability to attract highly educated migrants is most apparent in the increased volume of in-migrants with a bachelor’s degree or higher, and their positive net migration since the 1990s. Migration flows also suggest that those without a high school diploma see the city as a place of opportunity – they show slightly positive net migration in the most recent periods. Those who have just a high school diploma or some college actually show the greatest net migration losses.',
    descriptor: 'people whose educational attainment was'
  },
  earnings: {
    displayName: 'Earnings',
    displayParenthetical: '(In constant 2014 US dollars)',
    colors: ['#a6d1f8', '#012e60'],
    about: 'Earnings may change considerably when a person migrates, and these data represent only the amount a worker earns at their destination. Workers with earnings between $25,000 and $50,000 experienced net outflows in every decade, except the most recent, where the net inflow was 12,000. The same trajectory was true for workers with earning between $75,000 and $150,000, and for those earning $150,000 and over. These data indicate that the highest earners are currently coming to the city in larger numbers than previously, with a net migration that has turned slightly positive, a first in the post-1975 period. Indeed, across all earning groups, net migration losses were attenuated or net migration gains increased in 2010-2014.',
    descriptor: 'people whose earnings were'
  },
  occupation: {
    displayName: 'Occupation',
    colors: ['#F5BE9F', '#1B83B0', '#5E170E', '#FDC010', '#1F4064', '#CD594A', '#88D0EA', '#C17229'],
    about: 'Occupation describes a worker’s function within their workplace, irrespective of the industry in which they are employed. The City has historically been an attractive destination for the highly skilled. In the most recent period, net migration gains for higher skilled occupations (the first four bars) were consistently higher than for other occupations; net migration losses in earlier decades were lower. On the other end of the occupation spectrum, service workers in the most recent period were are at roughly zero net migration, while industrial workers had higher net outflows than other occupations.',
    descriptor: 'people whose occupation was'
  },
  industry: {
    displayName: 'Industry',
    colors: ['#F5BE9F', '#1B83B0', '#5E170E', '#FDC010', '#1F4064', '#CD594A', '#88D0EA', '#C17229'],
    about: 'Unlike occupation, which is more ascribed to an individual, industry may change with each new job and is likely to change at a migrant’s destination. NYC is a major employer of persons who work in Professional and Related Services, which has the largest volume of migration of any industry, and one that has seen substantial increases over time. This industry includes those employed in healthcare, education, and legal services. Relative to workers in other industries, this group saw the greatest net migration losses in the late 1970s, but now has the largest net migration gains.',
    descriptor: 'people whose industry was'
  }
};
