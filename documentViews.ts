import type {DefaultDocumentNodeResolver} from 'sanity/structure'
import {DoctorProfileStudioPreview} from './components/previews/DoctorProfileStudioPreview'
import {PostStudioPreview} from './components/previews/PostStudioPreview'
import {SiteSettingsStudioPreview} from './components/previews/SiteSettingsStudioPreview'

export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, {schemaType}) => {
  if (schemaType === 'post') {
    return S.document().views([
      S.view.form(),
      S.view.component(PostStudioPreview).title('Pré-visualização'),
    ])
  }

  if (schemaType === 'configuracoesSite') {
    return S.document().views([
      S.view.form(),
      S.view.component(SiteSettingsStudioPreview).title('Pré-visualização'),
    ])
  }

  if (schemaType === 'informacoesMedicos') {
    return S.document().views([
      S.view.form(),
      S.view.component(DoctorProfileStudioPreview).title('Pré-visualização'),
    ])
  }

  return S.document().views([S.view.form()])
}
