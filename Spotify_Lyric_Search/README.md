# 🎧 Spotify Lyric Finder

A lyrics-based song identification system that predicts the song name and artist using a small portion of lyrics provided by the user.
The system applies machine learning text similarity techniques to match user input with a large lyrics dataset.

---

## Project Overview

Spotify Lyric Finder helps users discover songs when they remember only a few lines of lyrics.
By analyzing textual similarity between the input lyrics and stored song lyrics, the system returns the most relevant match.

---

## 📂 Dataset

Source: Spotify Million Song Dataset (CSV format)
	Important Columns Used:
•	track_name – Name of the song
•	artist_name – Performer of the song
•	lyrics – Complete lyrics text

---

## Tech Stack

- **Programming Language:** Python
- **Libraries:**
  - `pandas` – Data handling
  - `scikit-learn` – TF-IDF vectorization & cosine similarity
  - `re`, `string` – Text preprocessing
- **ML Technique:**
  - TF-IDF (Unigrams + Bigrams)
  - Cosine similarity
  - Lexical word-overlap scoring

---

## System Architecture

```
User Lyrics Input
        ↓
Text Preprocessing
        ↓
TF-IDF Vectorization
        ↓
Cosine Similarity Matching
        ↓
Hybrid Scoring (TF-IDF + Word Overlap)
        ↓
Best Song Prediction
```

---

## Model Logic

### 1. Text Preprocessing

- Lowercasing
- Removal of punctuation and numbers
- Removal of lyric annotations (e.g., `[Chorus]`)
- Whitespace normalization

### 2. Feature Extraction

- TF-IDF Vectorizer
  - English stopwords removed
  - Unigrams + bigrams
  - Maximum 30,000 features

### 3. Similarity Scoring

Final score is computed as:

```
Final Score = (0.75 × TF-IDF Cosine Similarity)
            + (0.25 × Word Overlap Score)
```

The song with the **highest score** is returned as the best match.

> Note: The confidence score represents **similarity**, not probability.

---

## How to Run the Project

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/ritam2004-dev/Intern-Technical-Assessment.git
cd Spotify-Lyric-Search
```

### 2️⃣ Install Dependencies

```bash
pip install -r requirements.txt
```

### 3️⃣ Run the Application

```bash
python main.py
```

---

## 💡 Usage Instructions

1. Run the program.
2. Enter one or more lines of lyrics.
3. Press **ENTER** to submit.
4. The system returns the **best matching song and artist**.

### Example Output

```
--------------------------------------------------
Best Match:
Song   : Blinding Lights
Artist : The Weeknd
Score  : 0.823
--------------------------------------------------
```

---

## 📁 Project Structure

```
├── data/
│   └── Spotify Million Song Dataset_exported.csv
├── src/
│   ├── model.py
│   ├── predict.py
│   └── preprocess.py
├── main.py
├── requirements.txt
└── README.md
```

---

## 👨‍💻 Author

**Ritam Khatua**
