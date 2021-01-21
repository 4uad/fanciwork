from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import requests
import json

app = Flask(__name__)
CORS(app)

def filter_and_order(jobs, filters):
    def countTags(job):
        if 'tags' not in job:
            j['liked'] = 0
            j['disliked'] = 0
            return j
        j = job.copy()
        tags = set(j['tags'])

        intersectionWithLikes = len(tags.intersection(filters['with']))
        intersectionWithDislikes = len(tags.intersection(filters['without']))

        j['liked'] = intersectionWithLikes
        j['disliked'] = intersectionWithDislikes

        return j

    jobsWithMatches = list(map(countTags, jobs))

    if len(filters['with']):
        jobsWithMatches = list(filter(lambda job: job['liked'] > 0, jobsWithMatches))
        jobsWithMatches.sort(reverse = True, key = lambda job: job['liked'])

    if len(filters['without']):
        jobsWithMatches = list(filter(lambda job: job['disliked'] == 0, jobsWithMatches))

    return jobsWithMatches

def get_unique_tags(jobs):
    tags = []

    for job in jobs:
        if 'tags' in job:
            tags += job['tags']

    return list(set(tags))

@app.route('/', methods = ['POST'])
@cross_origin()
def get_ads():
    filters = request.get_json(force=True)
    r = requests.get('https://remoteok.io/api')
    jobs = json.loads(r.text)
    jobs.pop(0)
    
    processedJobs = filter_and_order(jobs, filters)
    unique_tags = get_unique_tags(processedJobs)

    result = {'jobs': processedJobs, 'tags': unique_tags, 'no_matches': len(processedJobs) == 0}

    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=False)