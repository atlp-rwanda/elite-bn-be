<<<<<<< HEAD
**What does this PR do?**

  it set up all folders required for backend
  
  **Description of Task to be completed?**

  have all folders required for backend done

  **How should this be manually tested?**
  
  after cloning a repo cd into it and RUN npm run start

  **Any background context you want to provide?**

  all JavaScript are written in ES6 and it use babel to transpire down to ES5

  **What are the relevant pivotal tracker stories?**

[#182201507](https://www.pivotaltracker.com/story/show/182201507)

####what are the relevant pivotal tracker stories?
https://www.pivotaltracker.com/n/projects/2569104/stories/182201510
=======
This branch checks code formating violations using ESlint & formats the code by running prettier formatter before pushing any changes to the repo

To test it you can easily clore the repo --> go to the ch-precommitscript-182201510 branch --> Make any changes in any files --> Hover around any the codes, if there are any code format violations you will see them highlighted by ESlint --> After checking those, you can now commit to the repo by running git commit and the codes will all be formatted automatically by prettier.

Please note that you have to install Eslint and prettier extensions on your IDE for the code formatting to run effectively

Here is the relevant pivotal tracker stories: https://www.pivotaltracker.com/n/projects/2569104/stories/182201510
>>>>>>> 905131f (ch(precommitscript): Configure ESLint and pre-commit script)
