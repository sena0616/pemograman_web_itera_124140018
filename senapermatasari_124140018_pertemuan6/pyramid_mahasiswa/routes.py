
def includeme(config):
    config.add_static_view('static', 'static', cache_max_age=3600)

    # Route halaman utama
    config.add_route('home', '/')

    # Route CREATE, UPDATE, dan DELETE Mahasiswa
    config.add_route('mahasiswa_add', '/api/mahasiswa', request_method='POST')
    config.add_route('mahasiswa_update', '/api/mahasiswa/{id}', request_method='PUT')
    config.add_route('mahasiswa_delete', '/api/mahasiswa/{id}', request_method='DELETE')

    # Route READ Mahasiswa
    config.add_route('mahasiswa_list', '/api/mahasiswa', request_method='GET')
    config.add_route('mahasiswa_detail', '/api/mahasiswa/{id}', request_method='GET')

    # Route CREATE, UPDATE, dan DELETE Matakuliah
    config.add_route('matakuliah_add', '/api/matakuliah', request_method='POST')
    config.add_route('matakuliah_update', '/api/matakuliah/{id}', request_method='PUT')
    config.add_route('matakuliah_delete', '/api/matakuliah/{id}', request_method='DELETE')

    # Route READ Matakuliah
    config.add_route('matakuliah_list', '/api/matakuliah', request_method='GET')
    config.add_route('matakuliah_detail', '/api/matakuliah/{id}', request_method='GET')
