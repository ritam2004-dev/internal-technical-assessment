import pandas as pd
from src.model import LyricModel
from src.predict import predict_song

DATA_PATH = "data/Spotify Million Song Dataset_exported.csv"

# Load and prepare the lyrics dataset.
def load_data(path):
    print("[INFO] Loading dataset...")
    df = pd.read_csv(path)

    df = df.rename(columns={
        "song": "track_name",
        "artist": "artist_name",
        "text": "lyrics"
    })

    df = df[["track_name", "artist_name", "lyrics"]].dropna()

    print(f"[INFO] Dataset ready. Total songs loaded: {len(df)}")
    return df


# Read lyric snippet (multi-line input).
def get_user_snippet():
    print("\nEnter lyric snippet (press ENTER twice to search):")

    lines = []
    while True:
        line = input()
        if not line.strip():
            break
        lines.append(line)

    return " ".join(lines).strip()


# Print prediction results.
def display_results(results):
    print("-" * 50)
    if not results:
        print("No matching song found.")
        return

    r = results[0]
    print("Best Match:")
    print(
        f"Song   : {r['song']}\n"
        f"Artist : {r['artist']}\n"
        f"Confidence  : {r['confidence']}"
    )
    print("-" * 50)



def main():
    print("\n==============================")
    print("   Spotify Lyric Search")
    print("==============================\n")

    # Load data
    df = load_data(DATA_PATH)

    print("\n[INFO] Initializing lyric search model...")
    model = LyricModel()

    print("[INFO] Training TF-IDF vectorizer (this may take a moment)...")
    model.fit(df)

    print("[INFO] Model successfully trained.")
    print("[READY] You can now search songs by lyrics.")
    print("\n--------Press Ctrl+C anytime to exit.--------")

    while True:
        try:
            snippet = get_user_snippet()

            if not snippet:
                print("[WARN] No lyrics entered. Please try again.")
                continue

            print("[INFO] Searching for best matches...")
            results = predict_song(model, snippet)

            display_results(results)

        except KeyboardInterrupt:
            print("\n[EXIT] Thank you for using Spotify Lyric Search.")
            break


if __name__ == "__main__":
    main()