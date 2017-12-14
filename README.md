# NYC Historic Migration Data Visualization

A single-page interactive visualization of historic U.S. Census migration data for New York City built with the guidance of NYC Planning's Population Division

The project's goals are as follows:

1. To create a compelling web experience for exploring NYC migration trends data, in support of a broader initiative by the population division highlighting migration patterns.
2. To create a re-usable template for future single-page dataviz projects, and a fully-functional project that can be used for learning basic web development and data visualization with d3.js.

![Screenshot](https://user-images.githubusercontent.com/409279/34007018-5b13c2d6-e0ce-11e7-9bee-3758de78890d.png)

## How we work

[NYC Planning Labs](https://planninglabs.nyc) takes on a single project at a time, working closely with our customers from concept to delivery in a matter of weeks.  We conduct regular maintenance between larger projects.  

## How you can help

In the spirit of free software, everyone is encouraged to help improve this project.  Here are some ways you can contribute.

- Comment on or clarify [issues](https://github.com/NYCPlanning/labs-migration-viz/issues)
- Report [bugs](https://github.com/NYCPlanning/labs-migration-viz/labels/bug)
- Suggest new features
- Write or edit documentation
- Write code (no patch is too small)
  - Fix typos
  - Add comments
  - Clean up code
  - Add new features

## Requirements

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Python](https://www.python.org/) (for local web server)

## Local Development

- Clone this repo `git clone https://github.com/NYCPlanning/labs-migration-viz.git`
- Navigate to the project directory `cd labs-migration-viz`
- Start a local webserver
  - **Python 2:** `cd labs-migration-viz && python -m SimpleHTTPServer 8000`
  - **Python 3:** `cd labs-migration-viz && python -m http.server 8000`
- Open the site in your browser at `http://localhost:8000`

## Architecture

This project uses [Bootstrap](https://getbootstrap.com/) for layout, and a custom [D3.js](https://d3js.org/) chart. 

## Deployment

This project can be deployed on any static web server. 

- Create a new Git remote called `dokku`: `git remote add dokku dokku@{servername}:{appname}`
- Deploy via Dokku using `git push dokku master`. Because `.static` exists in the root of the repo, Dokku will deploy the app using the NGINX buildpack. 

## Contact Us

You can find us on Twitter at [@nycplanninglabs](https://twitter.com/nycplanninglabs), or comment on issues and we'll follow up as soon as we can. If you'd like to send an email, use [labs_dl@planning.nyc.gov](mailto:labs_dl@planning.nyc.gov)
