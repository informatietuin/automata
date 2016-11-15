# Lev

I have a large vocabulary (one four and one five million words) and some texts (one set 250830 and one set words). For each word in the text I want to retrieve all the words in the vocabulary that are similar. Because I want to try different vocabulary compositions and measures of similarity the computation should not take too long; lets say less than an hour. Preferably it should complete on time on my laptop (1.7 GHz i5, 4GB), but it should definitely complete an time on a 2 core high-memory google compute engine instance (2 hardware hyperthreads on a Xeon E5 2.2 - 2.6 GHz, 13 GB). Also I want to implement this in javascript on nodejs. This mean that we're looking at a single thread and 6.5 GB of memory.

## Db

I've already had a go at this using a Redis database, but it looked like memory might become an issue and the program was more difficult to share this way. I do not need the networking component and although Redis is very fast, I chose Leveldb. It is slower user writing to disk but skips the network (albeit a local loop). If need be I can opt for an in memory version with some syncing extension. However I have not testing it and from experience I know that syncing databases can be tricky. Another interesting option is levelgraph, another extension to leveldb, but more about that later. The sorted composite keys in leveldb offer some interesting possibilities for handling large lists of words.

## Levenshtein

The Levenshtein distance is a common measure of similarity between strings. The distance represents the number of edits that are needed to change the one string into another. There are commonly two variation. The first uses insertion, deletion and substitution (the Levenshtein distance), the second also allows for transposition, swapping chars as one edit ( the Damerau - Levenshtein distance).

We will focus on the Levenshtein distance. It has some useful boundaries:

* It is always at least the difference of the sizes of the two strings.
* It is at most the length of the longer string.
* It is zero if and only if the strings are equal.

src https://en.wikipedia.org/wiki/Levenshtein_distance

## Wagner-Fischer algorithm

Computing this edit distance can be achieved by the Wagner-Fischer algorithm. This algorithm fills a matrix with all the distances of both the prefixes and adds the minimum distance between the prefix and the next characters in the strings (adding one for insertion deletion or substitution and zero if the next char is the same). The number in the bottom right at the last char for both strings is the edit distance.

See the pseudo code and example on the wikipedia page src https://en.wikipedia.org/wiki/Wagner%E2%80%93Fischer_algorithm

You can save space by only saving the previous row, because it is all you need to calculate the next row.

## Levenshtein Automata

A Levenshtein automaton for a string is a state machine that decides if a string is within a maximum edit distance. It is a non-deterministic (states can be passed more than once) finite acceptor. It uses the property that you only need the previous row in the Wagner-Fischer algorithm by using it as the state of a node a transition to the next node for the next character can be computed by

````
M[0,j] = j
M[i,0] = i
M[i,j] = min(M[i-1,j] + 1, M[i,j-1] + 1, M[i-1,j-1] + cost)
where cost = 0 if A[i] == B[j], and cost = 1 otherwise.
````

If there is a number in the new state that is less than or equal to the maximum edit distance the string can still match. The string has matched when there are no more characters and the last element in the state has a value smaller than the max distance.

src http://blog.notdot.net/2010/07/Damn-Cool-Algorithms-Levenshtein-Automata, http://julesjacobs.github.io/2015/06/17/disqus-levenshtein-simple-and-fast.html

## Deterministic Finite Automaton

It is possible to convert the state machine to a deterministic one by

## Minimal Finitestate Transducers / Directed Acyclic Word Graph


## Results
