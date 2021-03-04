from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from flask_caching import Cache
import requests
import json

cache = Cache(config={'CACHE_TYPE': 'simple', "CACHE_DEFAULT_TIMEOUT": 3600})

app = Flask(__name__)
CORS(app)
cache.init_app(app)

@cache.memoize()
def fetch_jobs():
    r = requests.get('https://remoteok.io/api')
    jobs = json.loads(r.text)
    jobs.pop(0)

    return jobs

@cache.memoize()
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

@cache.memoize()
def get_unique_tags(jobs):
    tags = []

    for job in jobs:
        if 'tags' in job:
            tags += job['tags']

    return list(set(tags))

@app.route('/fanciwork/api/', methods = ['POST'])
@cross_origin()
def get_ads():
    filters = request.get_json(force=True)
    jobs = fetch_jobs()
    
    processedJobs = filter_and_order(jobs, filters)
    matches = len(processedJobs)
    if 'max_length' in filters:
        processedJobs = processedJobs[:filters['max_length']]
    
    unique_tags = get_unique_tags(processedJobs)

    result = {'jobs': processedJobs, 'tags': unique_tags, 'matches': matches}

    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=False)