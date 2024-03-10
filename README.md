--------# TRI-NIT-Syntax-Error--------
A learning Web Application done using MERN(Using Next-JS) 

------GETTING STARTED--------
After downloading the zip file and unzipping the file open terminal and run 

-npm i(To install all the node module dependencies)

-npm i mongoose(Just in case,had to install mongoose seperately when i checked)

To install MongoDB

https://www.mongodb.com/try/download/community

->Go To community server section and click download

To install MongoDB Compass

https://www.mongodb.com/try/download/shell

->Download MongoDB shell and MongoDB compass 

->Open MongoDB Compass and type the url string as "mongodb://127.0.0.1:27017/trinit-db" to connect to the mongodb database to the project

->You can run mongosh command and mongod to view all the details in a new tab of the terminal

->Click the Save and Connect button to save and connect to the mongodb connection 

-npm run dev 

To start the project 
Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

This Next-JS and Mongodb project has been made to follow the MVC Architecture.The MongoDB model, defined in the models directory, represents the data model for the application.The React components represent the view.The controller logic is implemented in the API route /api/filename.js. This route handles the business logic for doing requested instructions.The connectDb middleware in middleware/mongoose.js is used to manage database connections. It ensures that a connection is established before handling the request.

Instructions to Run the Project

->The starting page of the project has 2 buttons one student and faculty, u can either choose to sign in or sign up once signed up you get redirected to homepage and then you need to login to go to dashboard for each type of user respectively

Further instructions to run the project is shown in the video
I have uploaded a google drive link for the demonstration videos:(5 videos explaining different parts of the project)

(link here :https://drive.google.com/drive/folders/1FQvrIYQW4HBlJxdIgasYxnvjp7zE_0Ap?usp=sharing)
--------------------------------------------------------------------------------------------------------------


--------LIST OF IMPLEMENTED FEATURES--------------

1.The implemented feature allows students to search for tutors based on language, experience, and pricing filters.



2.Authentication done using jwt token and checked whether token exists in each component after user login



3.Flashcard Storage Section for Students:

-Implemented a section where students can store flashcards for a specific language.
-Designed options for adding and removing flashcards.

4.Class Setup by Tutors:

-Tutors can set up classes based on their availability using the implemented feature.
-Classes are organized according to time slots for easy scheduling.

5.Custom Pricing by Tutors:Tutors have the ability to set their own pricing for their classes.

6.One-to-One Video Call Feature with Screen Sharing:

Designed and implemented a one-to-one video call feature for conducting classes.

7.Subscription-Based Payment Model:

Implemented a subscription-based payment model as the final step for students when selecting a tutor.

8.Personalized Test Assessment for Tutors:

-Implemented a feature enabling tutors to create personalized tests for individual students.
-Tutors can arrange and customize tests based on the student's learning needs and goals.

9.tudent Test Review Section:

-Added a dedicated section for students to review their past tests.
-Students can access and review their previous test results, including feedback provided by the tutor.

-------------------REFERENCES USED---------------------


Learn Next JS

To learn more about Next.js, take a look at the following resources:
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/)

Learn MongoDB

Documentation - https://docs.mongodb.com/manual/
Developer Center - https://www.mongodb.com/developer/
MongoDB University - https://learn.mongodb.com

Also took the help of ChatGPT to do the project!

CodeWithHarry helped me learn Next JS!

For Front End development

https://tailwindui.com/components

https://merakiui.com/components
