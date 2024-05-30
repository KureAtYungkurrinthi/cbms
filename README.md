# Committee/Board Management System

## Overview

**Customer**: [State Government](https://www.sa.gov.au/), [Parliament of
South Australia](https://www.parliament.sa.gov.au/)

Information on the Government of South Australia (GOSA) and Parliament
of South Australia can be found on the following web sites:

- <https://www.sa.gov.au/>
- <https://www.dpc.sa.gov.au/>
- <https://www.parliament.sa.gov.au/>

# Solution Outline:

At present all State Government Departments and Parliament of South
Australia use numerous *off-the-shelf* packages for managing committees
and boards, the Department of Premier and Cabinet (DPC) has identified
that **software costs**, **functionality** and **transferable skills for
staff** are an issue and wish to investigate developing software
in-house to manage and distribute documentation required for committee
and board meetings.

Current software being used currently include but are not limited to
[Diligent Boards](https://www.diligent.com/lp/board-portal-software-features), 
[OnBoard](https://www.onboardmeetings.com), 
[Pervasent Board Papers](https://www.pervasent.com/board-papers-lp) 
and [Board Effect](https://www.boardeffect.com/g-committee-software).

We have been asked to provide a proof of concept to investigate the
feasibility of providing a new software platform to all departments:

- Financial Costs
	- Printing & raw materials
    - Distribution
    - Standard across all government departments efficiency for staff training on-boarding
- Environmental Costs
    - Printing
- Ease of use
    - Committee and Board members will use the same platform for accessing documents no-matter which South Australian Board/Committee they sit on.
- Accessibility
    - Allowing for accessibility of any portals

You have been selected as the vendor to provide a solution that will
enable members to access Board/Committee meeting documentation in a
secured way, while enabling a reduction in the listed burdens, as well
as provide a high level of accuracy and efficiency in the administration
of these meetings.

## Project breakdown

The project will be broken into two modules: an admin portal web site
and a member facing web site.

### Administration 

Setting up meetings and arranging agenda and associated documents to be
available to the members

e.g.

```
Crime and Public Integrity Policy Committee (Parliament)
	Meeting Date -- 27/03/2024
		Members
			Chair
			Other Members
	Agenda
	Associated Documents
```

For each meeting, the administration team update the details and once
everything is in place **publish** the details, this will notify the
Members and allow them to access the details (Read Only). The
administration team will be able to amend the details and re-publish,
this will send notification emails to the members with what has changed.

### Members

Members should be able to access the meeting details and be able to
identify which documents relate to which agenda item, they should be
able to print and information relating to the meeting.


## Solution must consider:

- Identity verification
- Potential cyber security threats
- Data capture, storage and presentation
- User experience and UI/UX
- Scalability of deployed production environment
- Data storage and all processing **must** remain in Australia for [Data Sovereignty requirements](https://www.dpc.sa.gov.au/responsibilities/data-sharing/information-sharing-in-south-australia/south-australias-data-governance)

## Start

In an agile development environment, it is advisable to start with a
***sprint zero**.*

**Sprint Zero** does not have a customer production deliverable at the
end of the sprint but allows for a new team to construct an environment
whereby Sprint 1 can begin and be successful, some of the items
delivered at the end of Sprint Zero are:

- Team structure roles, some examples
    - Product Owner
    - Architect
    - Business Analyst
    - Project Manager
    - DevOps Engineer
    - Scrum Master
    - Developers
    - Testers
- Roadmap for full implementation
- Create DevOps environment
- Create Risks and Issues log
- Determine sprint length -- time to deliver a production ready module
- Sprint planning for Sprint 1
- Add Epics and User Stories and tasks for Sprint Zero and Sprint 1
- Set up boards for Sprint Zero and Sprint 1
- Determine testing strategies
- Create test plans for Sprint 1
- Source Control and Branching Strategy/configuration -- Pull Requests
- Decide on development tools/languages.
- Create Database, API and UI projects and develop simple one page application to display Application details.
- Create Build Pipelines with triggers for Development Branch **Continuous Integration**
- Development and Test Environments -- UI/API and Database, hosted areas for each environment with *minimal* deployment e.g.
    - A database in Azure with a table containing Application Details e.g. Name and Version
    - A web site in Azure for API with simple health API method to confirm working which reads Application Details from Database
    - An admin portal web site in Azure for UI with simple page which shows results of Health API call
    - A public facing web site in Azure for UI with simple page which shows results of Health API call
- Create Release Pipelines with triggers for Successful Builds -- **Continuous Deployment**