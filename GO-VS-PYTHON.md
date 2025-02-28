 
 # python

## all
```bash
ab -n 1000 -c 100 -l "http://localhost:8000/api/benchmark?iterations=10000&io_type=all"
```
3348.674 ms avg
33.487 sec total

## postgres
```bash
ab -n 1000 -c 100 -l "http://localhost:8000/api/benchmark?iterations=1&io_type=postgres"
```
77.115 ms avg
0.771 sec total

## file
```bash
ab -n 1000 -c 100 -l "http://localhost:8000/api/benchmark?iterations=1&io_type=file"
```
605.85 ms avg
1.651 sec total

## minio
```bash
ab -n 1000 -c 100 -l "http://localhost:8000/api/benchmark?iterations=1&io_type=minio"
```
2600.025 ms avg
26.000 sec total


## cpu
```bash
ab -n 1000 -c 100 -l "http://localhost:8000/api/benchmark?iterations=10000&io_type=cpu"
```
194.85
5.13 sec total







## all
```bash
ab -n 1000 -c 100 -l "http://localhost:3000/api/inbox/benchmark?iterations=10000&io_type=all"
```
412.02 ms avg
2.427 sec total

```bash
ab -n 1000 -c 10 -l "http://localhost:3000/api/inbox/benchmark?iterations=10000&io_type=all"
```
394.38 ms avg
2.536 sec total

```bash
ab -n 1000 -c 1 -l "http://localhost:3000/api/inbox/benchmark?iterations=10000&io_type=all"
```
142.88 ms avg
6.999 sec total


## postgres
```bash
ab -n 1000 -c 100 -l "http://localhost:3000/api/inbox/benchmark?iterations=1&io_type=postgres"
```
130.55 ms avg
1.306 sec total

## file
```bash
ab -n 1000 -c 100 -l "http://localhost:3000/api/inbox/benchmark?iterations=1&io_type=file"
```
65.556 ms avg
0.656 sec total

## minio
```bash
ab -n 1000 -c 100 -l "http://localhost:3000/api/inbox/benchmark?iterations=1&io_type=minio"
```
105.49 ms avg
1.055 sec total

## cpu
```bash
ab -n 1000 -c 100 -l "http://localhost:3000/api/inbox/benchmark?iterations=10000&io_type=cpu"
```
25.081 ms avg
0.251 sec total
