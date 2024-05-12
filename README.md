# Newcoin OS

<p align="center">
  <a href="https://jan.ai/guides">Getting Started</a> 
  - <a href="https://jan.ai/docs">Docs</a> 
  - <a href="https://github.com/janhq/jan/releases">Changelog</a> 
  - <a href="https://github.com/janhq/jan/issues">Bug reports</a> 
  - <a href="https://discord.gg/AsJ8krTT3N">Discord</a>
</p>

> ⚠️ **Newcoin OS is currently in Development**: Expect breaking changes and bugs!

Newcoin OS is an open-source ChatGPT alternative that runs 100% offline on your computer.

**Newcoin OS runs on any hardware.** From PCs to multi-GPU clusters, Newcoin OS supports universal architectures:

- [x] Nvidia GPUs (fast)
- [x] Apple M-series (fast)
- [x] Apple Intel
- [x] Linux Debian
- [x] Windows x64


Download the latest version of Newcoin OS in the **[GitHub Releases](https://github.com/janhq/jan/releases)**.

## Quicklinks

#### Newcoin OS

- [Newcoin OS website](https://newcoin.org/)
- [User Guides](https://jan.ai/guides/)
- [Developer docs](https://jan.ai/developer/)
- [API reference](https://jan.ai/api-reference/)
- [Specs](https://jan.ai/docs/)

#### Nitro

Nitro is a high-efficiency C++ inference engine for edge computing. It is lightweight and embeddable, and can be used on its own within your own projects.

- [Nitro Website](https://nitro.jan.ai)
- [Nitro GitHub](https://github.com/janhq/nitro)
- [Documentation](https://nitro.jan.ai/docs)
- [API Reference](https://nitro.jan.ai/api-reference)

## Troubleshooting

As Newcoin OS is in development mode, you might get stuck on a broken build.

To reset your installation:

1. Use the following commands to remove any dangling backend processes:

   ```sh
   ps aux | grep nitro
   ```

   Look for processes like "nitro" and "nitro_arm_64," and kill them one by one with:

   ```sh
   kill -9 <PID>
   ```

2. **Remove Newcoin OS from your Applications folder and Cache folder**

   ```bash
   make clean
   ```

   This will remove all build artifacts and cached files:

   - Delete Newcoin OS extension from your `~/newcoin/extensions` folder
   - Delete all `node_modules` in current folder
   - Clear Application cache in `~/Library/Caches/newcoin`

## Requirements for running Newcoin OS

- MacOS: 13 or higher
- Windows:
  - Windows 10 or higher
  - To enable GPU support:
    - Nvidia GPU with CUDA Toolkit 11.7 or higher
    - Nvidia driver 470.63.01 or higher
- Linux:
  - glibc 2.27 or higher (check with `ldd --version`)
  - gcc 11, g++ 11, cpp 11 or higher, refer to this [link](https://jan.ai/guides/troubleshooting/gpu-not-used/#specific-requirements-for-linux) for more information
  - To enable GPU support:
    - Nvidia GPU with CUDA Toolkit 11.7 or higher
    - Nvidia driver 470.63.01 or higher

## Contributing

Contributions are welcome! Please read the [CONTRIBUTING.md](CONTRIBUTING.md) file

### Pre-requisites

- node >= 20.0.0
- yarn >= 1.22.0
- make >= 3.81

### Instructions

1. **Clone the repository and prepare:**

   ```bash
   git clone https://github.com/janhq/jan
   cd newcoin
   git checkout -b DESIRED_BRANCH
   ```

2. **Run development and use Newcoin OS Desktop**

   ```bash
   make dev
   ```

This will start the development server and open the desktop app.

3. (Optional) **Run the API server without frontend**

   ```bash
   yarn dev:server
   ```

### For production build

```bash
# Do steps 1 and 2 in the previous section
# Build the app
make build
```

This will build the app MacOS m1/m2 for production (with code signing already done) and put the result in `dist` folder.

### Docker mode

- Supported OS: Linux, WSL2 Docker
- Pre-requisites:

  - Docker Engine and Docker Compose are required to run Newcoin OS in Docker mode. Follow the [instructions](https://docs.docker.com/engine/install/ubuntu/) below to get started with Docker Engine on Ubuntu.

    ```bash
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh ./get-docker.sh --dry-run
    ```

  - If you intend to run Newcoin OS in GPU mode, you need to install `nvidia-driver` and `nvidia-docker2`. Follow the instruction [here](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html) for installation.

- Run Newcoin OS in Docker mode
  > User can choose between `docker-compose.yml` with latest prebuilt docker image or `docker-compose-dev.yml` with local docker build

| Docker compose Profile | Description                                  |
| ---------------------- | -------------------------------------------- |
| `cpu-fs`               | Run Newcoin OS in CPU mode with default file system |
| `cpu-s3fs`             | Run Newcoin OS in CPU mode with S3 file system      |
| `gpu-fs`               | Run Newcoin OS in GPU mode with default file system |
| `gpu-s3fs`             | Run Newcoin OS in GPU mode with S3 file system      |

| Environment Variable    | Description                                                                                             |
| ----------------------- | ------------------------------------------------------------------------------------------------------- |
| `S3_BUCKET_NAME`        | S3 bucket name - leave blank for default file system                                                    |
| `AWS_ACCESS_KEY_ID`     | AWS access key ID - leave blank for default file system                                                 |
| `AWS_SECRET_ACCESS_KEY` | AWS secret access key - leave blank for default file system                                             |
| `AWS_ENDPOINT`          | AWS endpoint URL - leave blank for default file system                                                  |
| `AWS_REGION`            | AWS region - leave blank for default file system                                                        |
| `API_BASE_URL`          | Newcoin OS Server URL, please modify it as your public ip address or domain name default http://localhost:1377 |

- **Option 1**: Run Newcoin OS in CPU mode

  ```bash
  # cpu mode with default file system
  docker compose --profile cpu-fs up -d

  # cpu mode with S3 file system
  docker compose --profile cpu-s3fs up -d
  ```

- **Option 2**: Run Newcoin OS in GPU mode

  - **Step 1**: Check CUDA compatibility with your NVIDIA driver by running `nvidia-smi` and check the CUDA version in the output

    ```bash
    nvidia-smi

    # Output
    +---------------------------------------------------------------------------------------+
    | NVIDIA-SMI 531.18                 Driver Version: 531.18       CUDA Version: 12.1     |
    |-----------------------------------------+----------------------+----------------------+
    | GPU  Name                      TCC/WDDM | Bus-Id        Disp.A | Volatile Uncorr. ECC |
    | Fan  Temp  Perf            Pwr:Usage/Cap|         Memory-Usage | GPU-Util  Compute M. |
    |                                         |                      |               MIG M. |
    |=========================================+======================+======================|
    |   0  NVIDIA GeForce RTX 4070 Ti    WDDM | 00000000:01:00.0  On |                  N/A |
    |  0%   44C    P8               16W / 285W|   1481MiB / 12282MiB |      2%      Default |
    |                                         |                      |                  N/A |
    +-----------------------------------------+----------------------+----------------------+
    |   1  NVIDIA GeForce GTX 1660 Ti    WDDM | 00000000:02:00.0 Off |                  N/A |
    |  0%   49C    P8               14W / 120W|      0MiB /  6144MiB |      0%      Default |
    |                                         |                      |                  N/A |
    +-----------------------------------------+----------------------+----------------------+
    |   2  NVIDIA GeForce GTX 1660 Ti    WDDM | 00000000:05:00.0 Off |                  N/A |
    | 29%   38C    P8               11W / 120W|      0MiB /  6144MiB |      0%      Default |
    |                                         |                      |                  N/A |
    +-----------------------------------------+----------------------+----------------------+

    +---------------------------------------------------------------------------------------+
    | Processes:                                                                            |
    |  GPU   GI   CI        PID   Type   Process name                            GPU Memory |
    |        ID   ID                                                             Usage      |
    |=======================================================================================|
    ```

  - **Step 2**: Visit [NVIDIA NGC Catalog ](https://catalog.ngc.nvidia.com/orgs/nvidia/containers/cuda/tags) and find the smallest minor version of image tag that matches your CUDA version (e.g., 12.1 -> 12.1.0)

  - **Step 3**: Update the `Dockerfile.gpu` line number 5 with the latest minor version of the image tag from step 2 (e.g. change `FROM nvidia/cuda:12.2.0-runtime-ubuntu22.04 AS base` to `FROM nvidia/cuda:12.1.0-runtime-ubuntu22.04 AS base`)

  - **Step 4**: Run command to start Newcoin OS in GPU mode

    ```bash
    # GPU mode with default file system
    docker compose --profile gpu-fs up -d

    # GPU mode with S3 file system
    docker compose --profile gpu-s3fs up -d
    ```

This will start the web server and you can access Newcoin OS at `http://localhost:3000`.

> Note: RAG feature is not supported in Docker mode with s3fs yet.

## Acknowledgements

Newcoin OS builds on top of other open-source projects:

- [llama.cpp](https://github.com/ggerganov/llama.cpp)
- [LangChain](https://github.com/langchain-ai)
- [TensorRT](https://github.com/NVIDIA/TensorRT)
- [TensorRT-LLM](https://github.com/NVIDIA/TensorRT-LLM)

## Trust & Safety

Beware of scams.

- We will never ask you for personal info
- We are a free product; there's no paid version
- We don't have a token or ICO
- We are not actively fundraising or seeking donations

## License

Newcoin OS is free and open source, under the AGPLv3 license.
