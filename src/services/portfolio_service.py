from typing import List
from src.models.portfolio import Project, Certification, PersonalInfo


class PortfolioService:
    @staticmethod
    def get_personal_info() -> PersonalInfo:
        return PersonalInfo(
            name="Sahabaj Alam",
            title="Full Stack Developer & Data Scientist",
            bio="Passionate developer with expertise in Python, FastAPI, and machine learning. I love building scalable applications and exploring data-driven solutions.",
            email="your.email@example.com",
            linkedin="https://linkedin.com/in/yourprofile",
            github="https://github.com/yourusername",
            location="Your City, Country"
        )

    @staticmethod
    def get_projects() -> List[Project]:
        return [
            Project(
                id=1,
                title="AI-Powered Analytics Dashboard",
                description="A comprehensive analytics dashboard built with FastAPI and React, featuring real-time data visualization and machine learning insights.",
                image="/static/images/projects/1.jpg",
                technologies=["Python", "FastAPI",
                              "React", "PostgreSQL", "Docker"],
                github_url="https://github.com/yourusername/analytics-dashboard",
                live_url="https://your-dashboard.com",
                featured=True
            ),
            Project(
                id=2,
                title="Personal Portfolio Website",
                description="A responsive portfolio website built with FastAPI, featuring a blog, project showcase, and contact form.",
                image="/static/images/projects/2.jpg",
                technologies=["Python", "FastAPI",
                              "HTML", "CSS", "JavaScript"],
                github_url="https://github.com/yourusername/portfolio",
                live_url="https://your-portfolio.com",
                featured=True
            ),
            Project(
                id=3,
                title="Machine Learning Model API",
                description="RESTful API for serving machine learning models with FastAPI, including model versioning and monitoring.",
                image="/static/images/projects/3.jpg",
                technologies=["Python", "FastAPI",
                              "scikit-learn", "Docker", "Redis"],
                github_url="https://github.com/yourusername/ml-api",
                featured=False
            )
        ]

    @staticmethod
    def get_certifications() -> List[Certification]:
        return [
            Certification(
                id=1,
                title="TensorFlow Developer Certificate",
                issuer="TensorFlow",
                image="/static/images/certifications/tensorflow.jpg",
                issue_date="2024",
                credential_url="https://www.tensorflow.org/certificate"
            ),
            Certification(
                id=2,
                title="Google Cloud Professional Data Engineer",
                issuer="Google Cloud",
                image="/static/images/certifications/gcp.jpg",
                issue_date="2024",
                credential_url="https://cloud.google.com/certification"
            ),
            Certification(
                id=3,
                title="AWS Certified Machine Learning - Specialty",
                issuer="Amazon Web Services",
                image="/static/images/certifications/aws-ml.jpg",
                issue_date="2024",
                credential_url="https://aws.amazon.com/certification/certified-machine-learning-specialty/"
            ),
            Certification(
                id=4,
                title="Microsoft Azure AI Engineer Associate",
                issuer="Microsoft",
                image="/static/images/certifications/azure-ai.jpg",
                issue_date="2023",
                credential_url="https://docs.microsoft.com/en-us/learn/certifications/azure-ai-engineer"
            ),
            Certification(
                id=5,
                title="Deep Learning Specialization",
                issuer="Coursera (Andrew Ng)",
                image="/static/images/certifications/deeplearning.jpg",
                issue_date="2023",
                credential_url="https://www.coursera.org/specializations/deep-learning"
            ),
            Certification(
                id=6,
                title="Data Science Professional Certificate",
                issuer="IBM",
                image="/static/images/certifications/ibm-ds.jpg",
                issue_date="2023",
                credential_url="https://www.coursera.org/professional-certificates/ibm-data-science"
            )
        ]
