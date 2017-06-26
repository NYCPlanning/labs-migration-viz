var characteristics = { // eslint-disable-line
  age: {
    displayName: 'Age',
    colors: ['#a6d1f8', '#012e60'],
    about: 'Of all characteristics, age is one of the greatest predictors of migration. NYC consistently attracts large numbers of people in their 20s, and generally sees net migration losses of people in all other age groups. This is tied to the lifecycle of migration, whereby young single people move to the city, and leave after family formation. Over the past 30 years, net migration among those in their 20s has grown more positive.  While net migration was still negative for most other age groups, the most recent period has seen a reduction in net losses for most age groups.',
    descriptor: 'people aged'
  },
  sex: {
    displayName: 'Sex',

    colors: ['#1B83B0', '#C17229'],
    about: 'Historically, males and females are generally equally likely to move in or out of the city. However, in the 2010-2014 period, NYC experienced a net gain of 44,000 more women than men due to migration.',
    descriptor: 'people who reported as'
  },
  race_and_hispanic_origin: {
    displayName: 'Race and Hispanic Origin',
    colors: ['#1f4064', '#fdc010', '#cd594a', '#73c4e1', '#5e170e'],
    about: 'Each race/Hispanic group has shown a different pattern over the last 30 years. The City’s fiscal crisis in the 1970s saw a big loss of the white population, with smaller losses in the decades that followed. 2010-2014 shows positive net migration for white New Yorkers. The black population has shown consistent net migration losses since the 70s, a reversal of the trend in the earlier part of the 20th century that saw net migration for the black population surge, especially from the southern states.  Hispanics, too, have experienced net migration losses since the 70s, but their losses have been paired back and were close to zero in the latest time period.  Asians are the only major race/ethnic group to have positive net migration since 1975.',
    descriptor: 'people who reported their race as'
  },
  nativity: {
    displayName: 'Nativity',
    colors: ['#1B83B0', '#C17229'],
    about: 'Nativity of migrants reflects the significance of immigration to NYC. Through all periods where data are available, NYC saw large net gains of the foreign born population, while experiencing a net loss of native born persons. This illustrates NYC’s historic role in providing a beachhead for newcomers to the US and in turn sending native born people to the rest of the country.',
    descriptor: 'people who were'
  },
  marital_status: {
    displayName: 'Marital Status',
    colors: ['#FDC010', '#1F4064', '#88D0EA', '#CD594A'],
    about: 'Lifecycle migration is particularly evident through marital status data, which is closely related to age. Through all periods measured, NYC attracts large numbers of people who have never been married and, in turn, sees many married people leave. 2010-14 is the first period in our data showing net migration close to zero of married people however, indicating that families may be seeing the city differently than in the past.',
    descriptor: 'people who reported as'
  },
  educational_attainment: {
    displayName: 'Educational Attainment',
    colors: ['#a6d1f8', '#012e60'],
    about: 'NYC’s proclivity to attract more highly educated migrants is most apparent, given the increased volume of in-migrants with a bachelor’s degree or higher since 1995, and their positive net migration. Despite this, migration flows reflect the fact that the City has also provided opportunities for those without a high school diploma, who show net migration at zero or slightly positive in the most recent period.  Those who have just a high school diploma or some college actually show the greatest net migration losses.  This may be a reflection of the city’s bifurcated economy, with large numbers of skilled professionals as well as low skill workers who are often immigrants.',
    descriptor: 'people whose educational attainment was'
  },
  earnings: {
    displayName: 'Earnings',
    colors: ['#a6d1f8', '#012e60'],
    about: 'Earnings may change considerably when a person migrates, and these data represent only the amount a worker earns at their destination. Losses in the number of workers who earned income around the median value for all New Yorkers have experienced a net loss of population in every decade, except the most recent, where net migration was close to zero.  The same is true for workers earning $75,000-$149,000.  These data indicate that the highest earners are currently coming to the city in larger numbers than previously, with a net migration that is slightly positive, a first in the post-1975 period. ',
    descriptor: 'people whose earnings were'
  },
  occupation: {
    displayName: 'Occupation',
    colors: ['#F5BE9F', '#1B83B0', '#5E170E', '#FDC010', '#1F4064', '#CD594A', '#88D0EA', '#C17229'],
    about: 'Occupation describes a worker’s function within their workplace, irrespective of what industry they’re employed in. Net migration for higher skilled occupations (the first four bars) has consistently been higher than other occupations since 1975, especially for those professionals and managers in business and science, showing that the city’s has always attracted and better retained these types of workers, even during the 1970s fiscal crisis. Service and industrial workers (the last two bars) have tended to migrate out of the city, which is especially true today.',
    descriptor: 'people whose occupation was'
  },
  industry: {
    displayName: 'Industry',
    colors: ['#F5BE9F', '#1B83B0', '#5E170E', '#FDC010', '#1F4064', '#CD594A', '#88D0EA', '#C17229'],
    about: 'Unlike occupation, which is more ascribed to an individual, industry may change with each new job and is likely to change at a migrant’s destination. NYC is a big employer of persons who work in Professional and Related Services, where the volume of migration is the largest of any group in the most recent period, the result of substantial increases over time.  This industry includes those employed in healthcare, education, and legal services. Relative to workers in other industries, this group saw the greatest net migration losses in the late 70s but now has the greatest net migration gains.',
    descriptor: 'people whose industry was'
  }
};
