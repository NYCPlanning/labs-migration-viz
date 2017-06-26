NYC HISTORIC MIGRATION

SOURCE
Steven Ruggles, J. Trent Alexander, Katie Genadek, Ronald Goeken, Matthew B. Schroeder, and Matthew Sobek. Integrated Public Use Microdata Series: Version 5.0 [Machine-readable database]. Minneapolis, MN: Minnesota Population Center [producer and distributor], 2010.

1940 1% Sample, 1980 5% State Sample, 1990 5% Sample, 2000 5% Sample, and 2010-14 ACS.

Data recoded, post-processed, and corrected (for 1940 write-in data) by the NYC Dept. of City Planning, Population Division, 2017.

ABOUT
Every decade from 1940 to 2000, the long form census questionnaire collected detailed socioeconomic and demographic data from a sample of the US population. (Puerto Rico was added in 1980.) For decennial years in this period, except 1950, this questionnaire asked respondents to provide the state, county, and city or town where they lived �five years ago,� if they did not live in the same house. A subset of the complete questionnaire responses are available to researchers in the Public Use Microdata Sample (PUMS), which is harmonized for longitudinal study by the Minnesota Population Center�s IPUMS series. From these data, it is possible to identify migrants to and from NYC in the 1940, 1980, 1990, and 2000 census.

Beginning in 2006, the annual American Community Survey (ACS) replaced the long form census questionnaire. The ACS asks respondents to provide the state, county, and city or town where they lived �one year ago,� if they did not live in the same house. This change to an annual survey as well as the phrasing of the question from �five years ago� to �one year ago� raises comparability issues. In order to improve sample size, ACS data are typically aggregated to analyze responses collected over the span of five years rather than a single point in time, like the census. Furthermore, the switch in asking where someone lived �five years ago� to �one year ago� means that data are not immediately comparable, since fewer people are likely to have moved within the last year versus the last five years.

Due to circular migrations (a person moving from one place to another, only to return to their original home some time later), migration data from the ACS cannot simply be multiplied by five to obtain comparable data to years when respondents were asked where they lived �five years ago.� A NYC-specific crosswalk between ACS and Census migration data was created based on the 2000 Census, which asked where someone lived �five years ago,� and the Census 2000 Supplementary Survey (C2SS), which asked where someone lived �one year ago.� This resulted in an inflation factor of 3.75 applied to the ACS for domestic migrants (who experience high levels of circular migration to and from NYC) and 5 for international in-migrants, who are assumed to experience insignificant amounts of circular migration.

The data presented in these tables and charts use the 2010-14 five-year ACS IPUMS sample adjusted to be comparable to historic census data.


DEFINITION OF IN-MIGRANTS, OUT-MIGRANTS, AND STAYERS

For 1935-1940, 1975-1980, 1985-1990, and 1995-2000, the population universe being measured is all persons age five and over. This is because the migration question in the long form census asked where a respondent lived five years ago, and those under age five were not yet born.

In-migrants are defined as any person over the age of five who reported having lived anywhere in the world outside of New York City five years prior to being surveyed.

Out-migrants are defined as any person over the age of five who currently lives in the US or Puerto Rico but outside of NYC, and reported having lived in NYC five years prior to being surveyed.

Because the Census and American Community Survey only reaches current residents of the US and Puerto Rico, out-migrants from NYC with destinations outside of the US or Puerto Rico are not included in the data.

Stayers are defined as current NYC residents over the age of five who reported having lived in NYC five years prior to being surveyed. The stayer population serves as a basis for calculating migration rates.

FILE LAYOUT
Each characteristic (described in more detail below) has two or more groupings, listed in the second column of the csv. The remaining columns indicate the data year, as well as three types of flows associated with that year; 1) stayer population, 2) in-migrants, and 3) out-migrants. While the charts in the visualization do not display the stayer population, it may be helpful to researchers seeking to calculate migration rates for particular groups.

CHARACTERISTICS
Age: The respondent�s age at the time of the survey.

Race and Hispanic origin: Indicates a person�s race as well as any Hispanic origin. Since 1980, this information is self-reported. In 1940 the census enumerator assigned the respondent�s race. Race data is not available for Puerto Rican residents in 1980 and 1990, and are assumed to be Hispanic for this analysis.

Nativity: Indicates whether a person was born in the United States (including being born abroad to American parents) or foreign-born.

Sex: Indicates a person�s self-reported biological sex.

Marital Status: The respondent�s marital status at the time of the survey. The universe for this variable is all persons age 15 and over for all periods.

Educational Attainment: The highest level of education that the respondent had completed at the time of the survey. The universe for this variable is all persons age 25 and over for all periods.

Earnings: Indicates a person�s total pre-tax wage and salary income for the previous year, expressed in inflation adjusted 2014 US dollars. The universe for variable is all persons age 16 and over who worked 50 weeks or more in the previous year, and had earnings. Earnings in 1940 was top coded at $75,000.

Occupation: Indicates a person�s primary job function, regardless of the industry in which they are employed. This variable uses IPUMS�s OCC1990 codes that are historically harmonized. The universe for this variable is all persons age 16 and over who had worked within the previous five years, and were not new workers. Data are not available for 1940.

Management in business, science, and arts
Education, training, and library
Arts, design, entertainment, sports, and media
Other business, science, and arts professionals
Sales and related
Service occupations (includes active duty military)
Office and administrative support
Construction, maintenance, production, and transportation (includes natural resources and material moving occupations)

Industry: Indicates the type of industry in which a person performed an occupation, and refers to an economic sector rather than the worker�s job function. This variable uses IPUMS�s IND1990 codes that are historically harmonized. The universe for this variable is all persons age 16 and over who had worked within the previous five years, and were not new workers. Data are not available for 1940.

Finance, insurance, and real estate
Professional and related services
Business and repair services
Personal services and entertainment and recreation services
Retail trade
Public administration (includes active duty military)
Construction, manufacturing, and natural resources (includes agriculture, forestry, fisheries, and mining)
Transportation, wholesale, and utilities (includes communications)
