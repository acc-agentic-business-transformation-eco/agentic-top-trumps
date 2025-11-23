# Agentic Top Trumps

A Top Trumps style card game featuring modern Agentic AI tools and solutions. Compare stats like Task Orchestration, Context Management, and Scalability to beat the computer!

## Features

- **Interactive Gameplay**: Play against the computer in a classic Top Trumps format.
- **Agentic AI Cards**: Learn about various AI agents and frameworks (e.g., CrewAI, LangGraph, AutoGen) while playing.
- **Detailed Stats**: Compare vendors on 11 different metrics including Multi-Agent capabilities, Human Oversight, and Cost Effectiveness.
- **Flip for Info**: Click the info button on any card to see a detailed description and case studies for the AI solution.
- **Responsive Design**: Built with React and Tailwind CSS for a smooth experience on different devices.

## Tech Stack

- **React**: UI library for building the interface.
- **TypeScript**: For type safety and better developer experience.
- **Vite**: Fast build tool and development server.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Lucide React**: For beautiful icons.

## Project Structure

- `src/main.tsx`: Entry point of the application.
- `ai_vendors_top_trumps_fixed.tsx`: Main game component containing all the logic and UI.
- `seed.json`: Data source containing the AI vendor information used to generate the cards.
- `package.json`: Project dependencies and scripts.

## Setup & Installation

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Run development server**:
    ```bash
    npm run dev
    ```

3.  **Build for production**:
    ```bash
    npm run build
    ```

## How to Play

1.  You start with a card representing an AI Agent/Tool.
2.  Choose a statistic from your card that you think is strong (e.g., "Scalability: 9").
3.  If your value is higher than the computer's value for the same stat, you win the round!
4.  If it's lower, the computer wins.
5.  If it's a tie, no points are awarded.
6.  The game continues until all cards are used. The player with the most points wins.

## Data Source

The game data is loaded from `seed.json`, which contains a list of AI vendors with their respective stats and descriptions. This file acts as a static database for the application.
