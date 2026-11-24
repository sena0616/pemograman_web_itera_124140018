
from pyramid.view import view_config
from pyramid.httpexceptions import HTTPNotFound, HTTPBadRequest

from ..models import Matakuliah


@view_config(route_name='matakuliah_list', request_method='GET', renderer='json')
def matakuliah_list(request):
    data = request.dbsession.query(Matakuliah).all()
    return [item.to_dict() for item in data]


@view_config(route_name='matakuliah_detail', request_method='GET', renderer='json')
def matakuliah_detail(request):
    item = request.dbsession.query(Matakuliah).filter(
        Matakuliah.id == int(request.matchdict['id'])
    ).first()

    if item is None:
        raise HTTPNotFound()

    return item.to_dict()


@view_config(route_name='matakuliah_add', request_method='POST', renderer='json')
def matakuliah_add(request):
    try:
        data = request.json_body
        item = Matakuliah(
            kode_mk=data['kode_mk'],
            nama_mk=data['nama_mk'],
            sks=data['sks'],
            semester=data['semester']
        )
        request.dbsession.add(item)
        request.dbsession.flush()

        return {
            'success': True,
            'message': 'Data mata kuliah berhasil ditambahkan',
            'data': item.to_dict()
        }
    except (KeyError, ValueError, TypeError):
        raise HTTPBadRequest('Data mata kuliah tidak valid')


@view_config(route_name='matakuliah_update', request_method='PUT', renderer='json')
def matakuliah_update(request):
    item = request.dbsession.query(Matakuliah).filter(
        Matakuliah.id == int(request.matchdict['id'])
    ).first()

    if item is None:
        raise HTTPNotFound()

    try:
        data = request.json_body
        item.kode_mk = data['kode_mk']
        item.nama_mk = data['nama_mk']
        item.sks = data['sks']
        item.semester = data['semester']

        return {
            'success': True,
            'message': 'Data mata kuliah berhasil diperbarui',
            'data': item.to_dict()
        }
    except (KeyError, ValueError, TypeError):
        raise HTTPBadRequest('Data mata kuliah tidak valid')


@view_config(route_name='matakuliah_delete', request_method='DELETE', renderer='json')
def matakuliah_delete(request):
    item = request.dbsession.query(Matakuliah).filter(
        Matakuliah.id == int(request.matchdict['id'])
    ).first()

    if item is None:
        raise HTTPNotFound()

    request.dbsession.delete(item)

    return {
        'success': True,
        'message': 'Data mata kuliah berhasil dihapus'
    }
